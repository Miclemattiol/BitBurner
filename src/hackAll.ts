import { NS } from '@ns';

const hackFileName = 'hack.js';

export async function main(ns: NS) {
	const hackScriptRam = ns.getScriptRam(hackFileName);

	const hosts = ns.scan();
	hosts.forEach((host) => {
		if (!ns.hasRootAccess(host)) {
			if (
				ns.getHackingLevel() < ns.getServerRequiredHackingLevel(host) &&
				ns.getServerNumPortsRequired(host) == 0
			) {
				ns.tprint(`No root privileges... Nuking ${host}`);
				ns.nuke(host);
			} else {
				ns.tprint(`Can't nuke host ${host} yet`);
				return;
			}
		}
		if (ns.isRunning(hackFileName, host)) {
			ns.tprint(`Script already running. Killing...`);
			ns.scriptKill(hackFileName, host);
		}
		ns.scp(hackFileName, host);
		ns.tprint(`File ${hackFileName} copied into ${host}`);
		const serverMaxRam = ns.getServerMaxRam(host);
		const serverUsedRam = ns.getServerUsedRam(host);
		const serverRam = serverMaxRam - serverUsedRam;
		const threads = Math.floor(serverRam / hackScriptRam);
		ns.exec(hackFileName, host, { threads });
		ns.tprint(`Started ${hackFileName} on ${host}`);
	});
}
