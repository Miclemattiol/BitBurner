import { NS } from '@ns';
// import { calculateThreads } from './utils';

export async function main(ns: NS) {
	const host = ns.getHostname();
	if (host == 'home' || host.toLowerCase().startsWith('server')) {
		ns.tprint(`Are you sure you want to hack yourself? O_o`);
		return;
	}
	ns.tprint(`Started hacking ${host}`);
	const threads = ns.args[0] as number | undefined;
	const minSecurityLevel = ns.getServerMinSecurityLevel(host);
	while (true) {
		const securityLevel = ns.getServerSecurityLevel(host);
		if (securityLevel - minSecurityLevel > 1) {
			await ns.weaken(host, { threads });
		}
		// const threads = calculateThreads(ns, host, 0.1) as number;
		await ns.hack(host, { threads });
	}
}
