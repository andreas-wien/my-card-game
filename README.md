# Virtual card collection game.

## Cards
There are 3 types of cards:
- Monsters
- Spells
- Equipment

## Mana
Every card is associated with a cost of mana, which builds up over the course of a match. It starts at 1 for the starting player and 2 for the second player to make up for the starting advantage of player 1. As mentioned mana is increased by 1 every turn until it reaches the maximum of 12. Mana is restored every turn.

## Monsters
Monsters are the main actors on the board. They have 3 distinguishing stats:
- Power
- Toughness
- Health

Power is the hitting power of the monster. It dictates how much damage it can do. Damage can be inflicted to either another monster, or a player. Toughness is not reduced through attacks, but there are spells and effects which can reduce this stat.

Toughness is the defensive capability of the monster. It acts as a shield for the health of the monster. Damage to the health is calculated like this:
- damage = powerOfAttacker - toughnessOfDefender

Let's look at an example:

Monster #1:
Power: 8
Toughness: 2
Health: 1

Monster #2:
Power: 2
Toughness: 4
Health: 5

Monster #1 attacks Monster #2. The damage is 8 - 4 = 4. So the new health of Monster #2 is 5 - 4 = 1.

Another example:

Monster #3:
Power: 2
Toughness: 1
Health: 9

Monster #4:
Power: 4
Toughness 6
Health: 6

Monster #3 attacks Monster #4. The damage is 2 - 6 = -4. Negative damage is to be interpreted as damage dealt to the attacker. So the new health of Monster #3 is now 9 - 4 = 5. Monster #4 stays unscathed. This is of course a bad move, but spells, effects, or other game circumstances could force such a move.

That brings us to the last stat, health. If the health of a monster reaches zero it is defeated and moved to the graveyard. Health is not restored but stays lost throughout turns. Though there are spells and effects which can restore health. But the health stat of a monster is to be interpreted as maximum health. Restoring more health than the maximum health is not possible. However, there are spells and effects which can increase the maximum health of a monster.

Another important part of monsters are effects. Effects are game actions. There are 3 kinds of effects:
- Summon
- Death
- Turn

Summon effects are triggered the moment the monster card is played. Death effects are triggerd once the monster is defeated on the battlefield (health reaches 0), but not if moved from the hand of the player to the graveyard directly. Turn effects are triggerd on the end of every turn of the player in control of the monster card.

## Spells
Spells are instant effect cards. Whenever they are played their effect is instantly triggerd. They often have a low cost relative to their effect. There are spells with and without targets. If the spell needs targets specified the player playing the spell card has to choose the target(s) immediately after playing the card.

## Equipment
Equipment cards are stat boosts for monster cards. Equipment can only ever boost power and toughness. Health can only be boosted and restored via effects and spells. Once an equipment card is played, the player selects a monster to boost their stats. This is most likely going to be their own, howver rules allow enemy monsters to be the target of equipment cards.

## Summoning
The act of playing a monster card is called summoning. If the player has enough current mana, so at least the same amount as the cost of the monster card (current mana can reach zero but never be negative) and chooses to play the card, the monster is summoned onto the battlefield. The battlefield is the area of the currently controlled monsters of both players. Both sides can be in control of up to 5 monsters in parallel. So there are a maximum of 10 monsters simultaneously on the battlefield overall.

## Rarity of cards
Every card is associated with a rarity category. But every card has a rarity score that even differs within a category. Behind the scenes the rarity is represented by a floating point number between 0 and 100. Categories are then assigned like this:
< 15: Basic
< 30: Common
< 45: Uncommon
< 60: Rare
< 75: Epic
< 90: Mythical
>= 90: Legendary

The likelyhood of receiving a card within a card pack is then calculated like this:
100 - (100 * (Rarity / 100))

## Card packs
Card packs can be purchased with ingame currency called gold. A card pack always contains 5 cards. Which cards are then calculated like seen in the rarity section. However, one of those 5 cards has a modifier that makes it more likely to receive a rarer card.

## Ingame currencies
There are two ingame currencies:
- Gold
- Material

Gold is the money of the game. Card packs are purchased with gold. Gold can be earned through playing the game.

Material is received by destroying cards. How much material one receives is dictated by the rarity of the card. The rarer the card, the more material one receives for destroying it. Gained material can than be used to craft cards. This is the only way to collect specific cards. How much material you need to craft a card is once again dictated by the rarity of the card. The rarer the card the more material is needed.

## Deck
Every player has to have a deck of exactly 30 cards at the beginning of the game. There is no option to start with less or more than this amount. At the start of a match, both players draw 5 cards from their decks. Players have the option to review this very first 5 cards and put up to 3 cards back into their deck and draw the same amount of cards they put back into the deck. They can choose to not put any cards back into the deck. This is only possible once. They are stuck with whatever cards they draw after this.

At the start of every turn the player has to draw exactly one card. There is no option to forfeit this draw. This includes the very first turn.

Once all 30 cards of the player's deck have been drawn, players will take increasing damage every time they would have to draw a card but can't due to having none left, starting with 1 and no maximum.

## Deck building
Deck building rules are simple, there are just a few, beyond that, everything goes.

1. There have to be 30 cards in a deck
2. A single type of card may be included more than once in a deck, but not more than 3 times 
3. Only exception are cards with a rarity of at least mythical. These can only be included once in a deck.

To think this to the extreme, a deck could consist of just 10 unique cards with 3 copies of each. There are also no regulations on the type of cards, that have to be included. A deck could consist entirely of spell cards.

Mythical and legendary cards have unique effects that are very strong. That's why there can only be one copy per deck of those.

A deck can be thought of as a virtual selection of cards within a player's collection. That means that a deck does not consume a card for other decks. If a player has only one copy of a card, this one card can be included within 5 different decks. But it can only be included once per deck, since the player only has one copy of it.

Every player has 9 deck spots. So any player can have a maximum of 9 decks at a time. It is possible to delete all decks, but at least one deck is necessary to start a match.

Different play modes might include different rules, but these rules are always true. In other words, rules may be added but not substracted.

## Player
The player's only stat is their health. Players start with a health of 30. This stat works very much like health of monster cards. The only difference is that player's health has no theoretical maximum. Effects and spells could increase the player's health indefinitely. Once the player's health reaches zero, the match is over and the other player is declared the winner. There is no draw, if both players would reach zero in the same turn, the order of operations is to decide a winner. The first player reaching a health of zero, following the order of operations, is the loser.

## Turns
In a one off match, the starting player is to be decided by a coin flip. The winner of the coin flip chooses which player starts. In a best of series, this is only true for the very first match, afterwards the starting player has to be the player who did not start the previous match.

This starts the very first turn. Afterwards a turn starts once the other player ends their turn.

Turn phases are simple in this game. There are only three. They are executed in this order:
- Draw phase
- Main phase
- End phase

The draw phase is the very first phase and has to include the draw of a card from the deck of the player who's turn is starting.

The main phase includes all the main action. Cards can only be played during this phase. Playing cards and attacking can be done in any order the player who's turn it is chooses.

The end phase starts once the player who's turn it is chooses to end his turn. No actions can be performed by the player, but it (like the start of other phases as well) can act as a hook for effects and spells played during the main phase. An effect could be: Destroy all monster cards on the battlefield once a player ends their turn. This effect would be executed during the end phase. If there is no such effect in play, the end phase will just end the moment it started and the next turn starts.

## Cards in hand
The hand are the drawn, but not yet played cards of a player. A player can hold up to 12 cards in hand at a time. If a 13th card is to be drawn, the card gets put into the graveyard immediately and not in the hand of the player.

## Surrender
A player may choose to surrender a game at any time, if they feel that they have no chance left to win a game. This results in the instant win of their opponent. Inactivity will also lead to surrendering the game.
