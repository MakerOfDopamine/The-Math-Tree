addLayer("p", {
        name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#4BDC13",
        requires: new Decimal(0.1), // Can be a function that takes requirement increases into account
        resource: "prestige points", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(hasUpgrade("p",21) ? upgradeEffect("p",21).plus(1) : 1)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "p", description: "Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        upgrades: {
            rows: 3,
            cols: 7,
            11: {
                title: "1;1",
                description: "Start gaining points.",
                cost: new Decimal(1),
                effect() {
                    var row1 = []
                    var gain = hasUpgrade("p", 11) ? 0.01 : 0
                    //console.log(gain)
                    for (var i = 2; i < 8; i++) row1.push(hasUpgrade("p", Number("1" + String(i))) ? upgradeEffect("p", Number("1" + String(i))) : 1)
                    if (hasUpgrade("p",21)) row1[0] = row1[0].pow(2); row1[1] = row1[1].pow(2)
                    //console.log(row1)
                    for (var i = 2; i < 8; i++) gain = new Decimal(gain).times(row1[i - 2])
                    return format(gain,3);
                },
                effectDisplay() {
                    return "+" + upgradeEffect("p",11) + "/s."
                }
            },
            12: {
                title: "1;2",
                description: "Boost the previous upgrade. (Softcaps at x1.5 effect)",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("p",11)
                },
                effect() {
                    var effect = player.points.add(1).sqrt()
                    return new Decimal(effect.gt(1.5) ? effect.plus(1.5).sqrt() : effect)
                },
                effectDisplay() {
                    return "*" + format(upgradeEffect("p",12),3) + "."
                }
            },
            13: {
                title: "1;3",
                description: "Boost the previous upgrade slightly more. (Softcaps at x1.5 effect)",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("p",12)
                },
                effect() {
                    var effect = player.points.add(1).sqrt().pow(0.75)
                    return new Decimal(effect.gt(1.5) ? effect.plus(1.5).sqrt() : effect)
                },
                effectDisplay() {
                    return "*" + format(upgradeEffect("p",13),3) + "."
                }
            },
            14: {
                title: "1;4",
                description: "Same as 1;2.",
                cost: new Decimal(2),
                unlocked() {
                    return hasUpgrade("p",13)
                },
                effect() {
                    var effect = player.points.add(1).sqrt()
                    return new Decimal(effect.gt(1.5) ? effect.plus(1.5).sqrt() : effect)
                },
                effectDisplay() {
                    return "*" + format(upgradeEffect("p",14),3) + "."
                }
            },
            15: {
                title: "1;5",
                description: "Same as 1;4, but instead cube root it. (Softcaps at x1.225 effect)",
                cost: new Decimal(2),
                unlocked() {
                    return hasUpgrade("p",14)
                },
                effect() {
                    var effect = player.points.add(1).cbrt()
                    return new Decimal(effect.gt(1.225) ? effect.plus(1.5).cbrt() : effect)
                },
                effectDisplay() {
                    return "*" + format(upgradeEffect("p",15),3) + "."
                }
            },
            16: {
                title: "1;6",
                description: "Same.",
                cost: new Decimal(3),
                unlocked() {
                    return hasUpgrade("p",15)
                },
                effect() {
                    var effect = player.points.add(1).cbrt()
                    return new Decimal(effect.gt(1.225) ? effect.plus(1.5).cbrt() : effect)
                },
                effectDisplay() {
                    return "*" + format(upgradeEffect("p",16),3) + "."
                }
            },
            17: {
                title: "1;7",
                description: "Same, but it is faster. (Still softcaps at x1.225 effect)",
                cost: new Decimal(3),
                unlocked() {
                    return hasUpgrade("p",16)
                },
                effect() {
                    var effect = player.points.add(1).cbrt().pow(1.2)
                    return new Decimal(effect.gt(1.225) ? effect.plus(1.5).cbrt() : effect)
                },
                effectDisplay() {
                    return "*" + format(upgradeEffect("p",17),3) + "."
                }
            },
            21: {
                title: "2;1",
                description: "Boost Prestige Point gain, and 1;2 and 1;3 is applied again. (Softcaps at +0.1, Softcap^2 at +0.25)",
                cost: new Decimal(5),
                unlocked() {
                    return hasUpgrade("p",17)
                },
                effect() {
                    var effect = player.points.add(1).log10()
                    return (effect.gt(0.1) ? (effect.gt(0.25) ? effect.times(0.1).sqrt().times(0.3953).sqrt() : effect.times(0.1).sqrt()) : effect);
                },
                effectDisplay() {
                    return "+" + format(upgradeEffect("p",21),3) + " to the exponent."
                }
            }
        }
})