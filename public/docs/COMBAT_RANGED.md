# Ranged Combat

> Back to [VRMMO_INDEX.md](VRMMO_INDEX.md)  
> Master blueprint: [VRMMO_DESIGN_BLUEPRINT.md](VRMMO_DESIGN_BLUEPRINT.md)

## Identity

Ranged combat is trajectory mastery. Archers and crossbow users choose quivers, draw forms, aim paths, curve behavior, scout tools, and recall timing.

## Core Flow

```mermaid
flowchart LR
    A["choose quiver"] --> B["nock arrow/bolt"]
    B --> C["draw or aim form"]
    C --> D["range vision preview"]
    D --> E["release"]
    E --> F["arrow remains in world"]
    F --> G["recall through crystal"]
```

## Quivers

| Quiver | Role | Examples |
|---|---|---|
| Back | core combat | quick shot, power shot, pierce, mark |
| Left hip | utility / control | smoke, rope, flare, binding, silence |
| Right hip | heavy / magical | lightning pierce, breaker, explosive, boss tools |

## Draw Forms

| Form | Activation | Fantasy |
|---|---|---|
| Full draw | hold to high tension | power / pierce |
| Snap draw | quick pull and release | fast interrupt |
| High arc | aim above target | volley / AoE |
| Ground aim | aim into terrain | tunneling / trap |
| Held mark | hold aim on target | binding / weakpoint |
| Side draw | angled posture | curve / evasive shot |
| Double nock | two arrows | split shot |
| Overdraw | beyond safe tension | high-risk breaker |

## Example Combinations

| Input | Result |
|---|---|
| Back quiver + full draw | Power Shot |
| Back quiver + snap draw | Quick Shot |
| Left quiver + high arc | Smoke Volley |
| Left quiver + held mark | Binding Shot |
| Right quiver + full draw | Lightning Pierce |
| Right quiver + overdraw | Dragonbone Breaker |
| Left quiver + ground aim | Root Snare |
| Back quiver + wall angle | Ricochet Shot |

## Curving Shots

Curving shots unlock when the player angles or rotates the bow/crossbow before firing.

```text
normal aim = straight shot
roll left = curve left
roll right = curve right
tilt up = lofted curve
tilt down = dipping curve
hold longer = clearer path preview
```

The preview can be called Range Vision, Archer's Thread, Eagle Thread, Trajectory Sight, or Fate Line.

Balance:

- stronger curves reduce speed, damage, or armor penetration.
- heavy bolts curve less than arrows.
- strong curve paths cost Vitae or require a skillstone.
- enemies should get subtle tells for magical bends.

## Eagle Eye And Scout Role

Ranged players should be valuable to parties through scouting and marking.

| Ability | Use |
|---|---|
| Eagle Eye | stabilized distant zoom or terrain lens |
| Weakpoint Mark | reveal armor gaps or vulnerable spots |
| Trail Sight | track footprints and monster movement |
| Wind Read | predict projectile drift and weather difficulty |
| Watchpoint | party-visible target or route mark |
| Survey Pulse | reveal resources or hidden paths |

VR comfort: prefer a stabilized circular lens, bow crystal scope, spyglass attachment, or cardinal-assisted view over full-screen zoom.

## Recall Ammo

Arrows and bolts remain where they land until the player recalls them through a bow or crossbow crystal.

Resource loop:

- fire arrows.
- commit ammo into the battlefield.
- fight with limited remaining shots.
- choose safe recall timing.
- arrows return to the quiver.

Recall types:

| Type | Behavior |
|---|---|
| Quick | fast but easier to interrupt |
| Charged | stronger and safer but visible |
| Silent | stealth recall |
| Violent | damages enemies on return path |
| Anchor | keeps arrows as traps until recalled |
| Scatter | curved return paths |

