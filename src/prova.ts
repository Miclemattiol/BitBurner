import { NS } from '@ns';
// import { deepScan, hackableFilter, hackBlacklist } from './utils';

export const main = async (ns: NS) => {
	// ns.renamePurchasedServer('n00dles-grow-node', 'n00dles-node-1');
	// ns.renamePurchasedServer('n00dles-weaken-node', 'n00dles-node-2');
	// ns.renamePurchasedServer('n00dles-hack-node', 'n00dles-node-3');

    ns.purchaseServer("max-hardware-node-1", 1024);
    ns.purchaseServer("max-hardware-node-2", 1024);
    ns.purchaseServer("max-hardware-node-3", 1024);
};
