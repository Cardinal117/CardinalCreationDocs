# Diegetic UI, Cardinal Familiar, And Vitae

> Back to [VRMMO_INDEX.md](VRMMO_INDEX.md)  
> Master blueprint: [VRMMO_DESIGN_BLUEPRINT.md](VRMMO_DESIGN_BLUEPRINT.md)

## Design Goal

The normal world should avoid flat floating UI as much as possible. The player should read status and access systems through objects, familiars, books, gloves, lenses, and physical rituals.

## Cardinal Familiar

The cardinal familiar is the player's main meta-interface anchor.

| Access Method | Flow | Purpose |
|---|---|---|
| Quick access | menu button, cardinal flies across view, transition into pocket UI | fast settings, logout, comfort |
| Immersive access | extend arm, bird lands, look into bird's eye, enter pocket UI | roleplay-friendly deeper interface |

Other players see a shadow, phantom, or resting projection while the player is in the UI pocket scene.

The cardinal can handle:

- settings and logout.
- party invites.
- social notifications.
- map and quest access.
- skillstone inspection.
- trade notifications.
- tutorial hints.
- scout reports.
- comfort settings.

## Skillstone Inspection

Stones can show class-specific visions.

```text
Storm Stone

Mage: lightning ritual and spell circle
Warrior: lightning blade stance and slash
Archer: lightning arrow and recall chain
```

This lets one item exist in the economy while different disciplines interpret it differently.

## Glove Vials

The player receives an early glove that shows health and shared resource state through hanging vial charms.

| Vial | Resource | Visual |
|---|---|---|
| Red vial | health / blood vitality | red liquid, pulse, cracks at critical health |
| Blue vial | Vitae / life force | blue liquid, glow, sparks, dimming at low resource |

The vials should hang from small chains and move subtly with the wrist. The reference feel is tactile and ornamental: small potion charms attached to leather and metal.

## Vitae

Vitae is the working name for the shared non-health resource. Alternatives include Life Force, Aether, Spirit, Essence, and Vital Energy.

| Class Path | Vitae Use |
|---|---|
| Mage | spells, healing, shields, rituals |
| Warrior | enhanced stance arts and spellstone skills |
| Archer | special arrows, recall effects, Eagle Eye |
| Cursed artifact user | demon eye abilities and curse suppression |

Vitae being shared allows party resource support. A warrior who uses less Vitae can give potions to a mage who needs heals and defensive spells.

## Resource Feedback

| State | Object Feedback | Sensory Feedback |
|---|---|---|
| low health | red vial pulses | soft red edge pulse, heartbeat |
| critical health | red vial cracks or darkens | stronger vignette, breathing |
| low Vitae | blue vial dims | mild desaturation, weaker magic particles |
| critical Vitae | blue liquid pales | stronger desaturation, quieter magic audio |

VR comfort rule: strong tinting, blur, and desaturation should be adjustable and reserved for extreme states.

