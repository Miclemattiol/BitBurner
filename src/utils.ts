import { NS } from '@ns';

export const getPortScripts = (ns: NS) => [ns.brutessh, ns.ftpcrack];

export const hackBlacklist = (host: string) =>
	host != 'home' && !host.toLowerCase().startsWith('server');

export const hackableFilter = (ns: NS, host: string) =>
	ns.hasRootAccess(host) ||
	(ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(host) &&
		ns.getServerNumPortsRequired(host) <= getPortScripts(ns).length);

export const calculateThreads = (ns: NS, host: string, ramCost: number) => {
	const serverMaxRam = ns.getServerMaxRam(host);
	const serverUsedRam = ns.getServerUsedRam(host);
	const serverRam = serverMaxRam - serverUsedRam;

	return Math.floor(serverRam / ramCost);
};

export const deepScan = (ns: NS, localhost: string) => {
	const hosts = new Set<string>();

	const supportF = (localhost: string) => {
		if (hosts.has(localhost)) return;
		hosts.add(localhost);
		ns.scan(localhost).forEach(supportF);
	};

	supportF(localhost);

	// return hosts.values().toArray();
    return Object.values(hosts) as string[];
};
