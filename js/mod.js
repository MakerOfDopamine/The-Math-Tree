let modInfo = {
	name: "The Ultimate Tree",
	id: "ultimate",
	author: "me",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/MakerOfDopamine/The-Modding-Tree/blob/master/changelog.md",
    offlineLimit: 24,  // In hours
    initialStartPoints: new Decimal (10) // Used for hard resets and new players
}

// Set your version in num and name
let VERSION = {
	num: "0.0.1",
	name: "The Prestige Update",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade("p",11)) gain = gain.plus(1)
	for (var t = 2; t < 8; t++) if (hasUpgrade("p",Number("1" + t))) gain = gain.times(hasUpgrade("p",24) ? 3 : 2)
	let upg21Eff = upgradeEffect("p",21)
	if (hasUpgrade("p",21)) gain = gain.times(upg21Eff)
	let upg22Eff = upgradeEffect("p",22)
	if (hasUpgrade("p",22)) gain = gain.times(upg22Eff)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("eeee10"))
}

// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000*24) // Default is 1 hour which is just arbitrarily large
}