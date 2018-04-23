import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.bit.beems{
   export class User extends Participant {
      id: string;
      name: string;
   }
   export class AssetLocation extends Asset {
      assetID: string;
      gpsLocation: string;
      timestamp: string;
   }
// }
