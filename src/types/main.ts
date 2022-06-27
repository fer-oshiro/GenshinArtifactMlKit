import { IArtifact } from "./artifact"
import { ICharacter } from "./character"
import { MaterialKey } from "./material"
import { IWeapon } from "./weapon"

export interface IGOOD {
  format: "GOOD" // A way for people to recognize this format.
  version: number // GOOD API version.
  source: string // The app that generates this data.
  characters?: ICharacter[]
  artifacts?: IArtifact[]
  weapons?: IWeapon[]
  materials?: { // Added in version 2
    [key:MaterialKey]: number
  }
}