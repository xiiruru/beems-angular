'use strict';

/**
 * Track the update of an asset from one place to another
 * @param {org.bit.beems.UpdateBEEMSAsset} updateBEEMSAsset - the BEEMSasset to be processed
 * @transaction
 */
async function doUpdateBEEMSAsset(updateBEEMSAsset) {
    updateBEEMSAsset.oldBEEMSAssetInfromation.assetContentHash = updateBEEMSAsset.assetContentHash;
    updateBEEMSAsset.oldBEEMSAssetInfromation.currentGPSLocation = updateBEEMSAsset.currentGPSLocation;

    let assetRegistry = await getAssetRegistry('org.bit.beems.BEEMSAsset');
    await assetRegistry.update(updateBEEMSAsset.oldBEEMSAssetInfromation);
}
