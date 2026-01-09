
export interface IActionContent {
    actionName: string,
    actionType: "free" | "interaction" | "standard" | "special",
    actionCategory: string,
    description: Array<string>
}

export const actionsContent: Array<IActionContent> = [
    {
        actionName: "Equip",
        actionType: "interaction",
        actionCategory: "standard",
        description: ["You can Equip a weapon that you have holstered. You can choose to Holster an existing weapon that you're holding as a part of this Free Action."]
    },
    {
        actionName: "Interact",
        actionType: "interaction",
        actionCategory: "standard",
        description: ["You can perform a simple task, such as opening a door, pulling a lever, or interacting with other such mundane objects. "]
    },
    {
        actionName: "Swap Stance",
        actionType: "interaction",
        actionCategory: "standard",
        description: ["You can change your current Stance, unless you have a condition preventing it, such as [[condition.exposed]]. "]
    },
    {
        actionName: "Attack",
        actionType: "standard",
        actionCategory: "standard",
        description: ["You may use a Weapon Attack Card to begin an Attack Sequence. You can initiate a number of Attack Sequences equal to your [[color..Attacks Per Turn]] per Round.",
            "When you initiate an Attack Sequence, you (typically) make the first Attack. If your target(s) have an Equipped weapon which is within range, they can take the Counter Action against you and only you. Afterwards, if you have any card which grants you a [[color..Bonus Attack]], you make that Attack after the Counter (if applicable). This is called the Attack Sequence.",

        ]
    },
    {
        actionName: "Counter",
        actionType: "special",
        actionCategory: "standard",
        description: ["When you are targeted with an Attack, Spell, or Hack by a creature, if you have an Equipped weapon which is within range of the assailant, you can make a Weapon Attack against them and only them.",
            "Note: You do not necessarily need to have the Attack Card equipped on your character sheet, so long as the weapon they use is Equipped."

        ]
    },
    {
        actionName: "Refresh",
        actionType: "special",
        actionCategory: "standard",
        description: ["At the Start of every round, ALL creatures regain Stamina equal to their Stamina Refresh and Tether equal to their Tether Refresh. Additionally, they regain 1 Action Point if they are missing any."]
    },
    {
        actionName: "Cast a Spell",
        actionType: "standard",
        actionCategory: "magic",
        description: ["You may use a completed Spell Card to cast a spell. A Spell Card may require more than one Action to cast. In this case, you may either spend Action Points to cast the spell immediately, or you may begin to cast the spell on one turn, and finish it using your Action on the next turn, no matter how many Actions the spell costs.",
            "When you take this Action, you cannot move until you Resolve this Action. If you decide to start the Cast a Spell Action on a different turn than the turn it Resolves, the Action is interrupted if you lose all your Stamina or are affected by a condition which would prevent you from casting such as [[condition.silenced]] or [[condition.addled]].",
            "If your spell directly targets a Creature, that creature has the ability to perform the Counter Action against you and only you.",
            "When the Spell Resolves, spend Tether equal to the Tether Cost of the Spell.",
            "If the spell does not directly apply an Enchantment or make a Creation, even if the duration of the Spell is longer than Instant, the effect occurs Instantaneously unless otherwise specified."
        ]
    },
    {
        actionName: "Cast a Hack",
        actionType: "standard",
        actionCategory: "hacking",
        description: [
            "You may use a completed Hack Card. A Hack Card typically takes one Action, but certain cards may change that.",
            "When this Hack Resolves, spend Technik equal to the Technik Cost of this Hack and apply [[condition.surge]] to yourself equal to the Hack's Surge Cost.",
            "If your spell directly targets a Creature, that creature has the ability to perform the Counter Action against you and only you.",
            "If the Hack does not directly apply an Enchantment or make a Creation, even if the duration of the Hack is longer than Instant, the effect occurs Instantaneously unless otherwise specified."
        ]
    },
    {
        actionName: "Step",
        actionType: "special",
        actionCategory: "movement",
        description: ["You are able to move a number of hexes equal to your Movement Speed. If you take another Standard Action in between a Step, your Step ends and you cannot use the remainder of the movement from that Step.",
            " When leaving a hex which is considered [[condition.rough_terrain]], you must spend that number of Hexes of movement to move out of it.",
            "You can spend a single Step to remove 2 steps of [[condition.hobbled]] instead of moving. You can also spend a single Step to remove 1 Stack of [[condition.prone]].",
            "Certain type of locomotion require more finesse than simple walking. These may include things like Climbing, Leaping, Flying, etc.",
            "By default, you are Partially Effective at Climbing and Leaping (with a running start). You are Ineffective at Leaping (without a running start) and Flying.",
            "There are four tiers of movement Effectiveness: Very Effective, Effective, Partially Effective, and Ineffective.",
            "[[color..Very Effective]]: You can use this form of locomotion even more effectively than walking, able to move at one-and-a-half times your Step Speed (rounded up) with this form of locomotion.",
            "[[color..Effective]]: You can use this form of locomotion at your regular Step Speed.",
            "[[color..Partially Effective]]: You can use this form of locomotion at significantly reduced speed, only able to move at half your Step Speed (rounded down).",
            "[[color..Ineffective]]: You are unable to use this form of locomotion in any useful way."]
    },
    {
        actionName: "Dash",
        actionType: "standard",
        actionCategory: "movement",
        description: ["You grant yourself two Steps which are lost at the end of your turn. You can always leave [[condition.rough_terrain]] with a single Dash Action.",
            "You can spend a Dash Action to remove 1 Stack of [[condition.immobilized]]"]
    },
    {
        actionName: "Rally",
        actionType: "standard",
        actionCategory: "standard",
        description: ["You can spend your Action to regain 1 Action Point."]
    },
    {
        actionName: "Take a Breather",
        actionType: "standard",
        actionCategory: "standard",
        description: ["You can spend your Action to regain Stamina equal to your Stamina Refresh."]
    },
    {
        actionName: "Lock the Initiative",
        actionType: "special",
        actionCategory: "standard",
        description: [
            "At the end of the Round, if you were the last creature to act, you may ask the player at the top of the Initiative order to Lock the Initiative. If agreed, the initiative order is Locked and will proceed in the same order for the rest of the Round. ",
            "At the end of a subsequent Round where the initiative is Locked, you may choose to Keep the Initiative Locked. If you do so, you may assign an Extra Action Point to one Commander on the battlefield after Refresh."
        ]
    },
    {
        actionName: "Recall",
        actionType: "standard",
        actionCategory: "hacking",
        description: [
            "You spend an Action to regain all of your Technik. Before you restore your Technik to full, remove all Creations and Enchantments you have applied with Technik from the Encounter.",
            "Secondly, add to your Locked Technik an amount equal to your [[condition.surge]].",
            "Then decide which of your Active Gadgets you wish to remain Activated.",
            "Finally, regain all of your non Locked Technik."
        ]
    },
    {
        actionName: "Activate Gadget",
        actionType: "standard",
        actionCategory: "hacking",
        description: [
            "Certain Gadgets can provide their effects passively so long as you Lock the Technik Cost to use them. As an Action, you can choose any number of these passive gadgets to Activate, Locking the Technik they require.",
            "Additionally, certain Active Gadgets may call for you to use the Activate Action to gain their benefit."
        ]
    },

    {
        actionName: "Escort",
        actionType: "standard",
        actionCategory: "movement",
        description: [
            "You can spend an Action moving another Creature or Cache (this may include anything from a crate of items to a group of civilians who are in danger). You can choose any Creature or Cache within R1, so long as they are not tied down or have their movement hampered in any way, such as by the [[condition.hobbled]] condition. Additionally, if there are hostile creatures in the Hex which has the entity you wish to Escort, you cannot use this Action on that entity.",
            "You can choose to move the Creature or Cache to an unoccupied space within your Hex or an Adjacent Hex which contains no hostile creatures. A Hex can only hold 3 Hex Objects (such as Caches) at a time."
        ]
    },
    {
        actionName: "Resupply",
        actionType: "standard",
        actionCategory: "convoy",
        description: [
            "You spend an Action to regain all of your Quick Slots. You must be within R1 of the Deployment Zone or a Convoy Flag."
        ]
    },
    {
        actionName: "Reinforce",
        actionType: "standard",
        actionCategory: "convoy",
        description: [
            "If you have an empty Minion Slot, you can add a minion to your Battalion. You must be within R1 of the Deployment Zone or a Convoy Flag. The reinforcement is placed at any location within 1 Hex of the Reinforcement Flag or Deployment Zone."
        ]
    },
    {
        actionName: "Plant a Flag",
        actionType: "standard",
        actionCategory: "convoy",
        description: [
            "You can Plant a Convoy Flag in the Hex you occupy. There cannot be any hostile creatures within 1 Hex of the Convoy Flag when you plant it."
        ]
    },
    {
        actionName: "Uproot",
        actionType: "standard",
        actionCategory: "standard",
        description: [
            "You can choose to destroy a Totem, Rift, or Convoy Flag which you share a Hex with.",
            "To uproot a Convoy Flag, you simply need to take this Action.",
            "To uproot a Rift, you must be able to hit it with Magical damage.",
            "To uproot a Totem, you must make a successful Occult check, with a DC equal to the Tier of the Totem."
        ]
    },
    {
        actionName: "Heighten",
        actionType: "free",
        actionCategory: "standard",
        description: [
            "On your turn, you can choose to Heighten a condition which is triggering. The effect does not have to be applied to you, but you must be effecting the creature you intend to Heighten",
            "For example, if you are Casting a Spell against a creature who has 6 Stacks of Unlucky. You can choose to Heighten their [[condition.unlucky]], having them use 5 Stacks to roll two fewer dice instead of one."
        ]
    },
    {
        actionName: "Search",
        actionType: "standard",
        actionCategory: "standard",
        description: ["You can spend your Action to attempt to look for something or someone. This may involve making a Discovery or Perception check, depending on the nature of the attempt."]
    },
    {
        actionName: "Hide",
        actionType: "standard",
        actionCategory: "standard",
        description: ["You can spend your Action attempting to Hide from other creatures and sensors. Make a Stealth or Streetwise check to attempt to blend in to your surroundings, depending on how you intend to Hide.",
            "In order to hide, you require Obfuscation, whether that takes the form of a pitch dark corner, blending into a crowd, or a cloud of fog.",
            "If you take the Step Action while hiding, you must make a new Stealth or Streetwise check for each Step made. If you do not end your Movement Obfuscated, you are no longer Hidden. You must be Obfuscated every two Step Actions.",
            "Taking any offensive action will reveal your position unless otherwise specified."
        ]
    },
    {
        actionName: "Consume",
        actionType: "standard",
        actionCategory: "convoy",
        description: ["You can spend your Action to spend Quick Slots to use a Consumable.",
            "If for example, you have 3 Quick Slots, you can produce an Ether as if its been on your person the entire time, and reduce your Quick Slots to 2."
        ]
    },

]