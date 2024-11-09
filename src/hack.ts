import { NS } from '@ns';

export async function main(ns: NS) {
	const scriptName = ns.getScriptName();
	ns.tprint(`Started ${scriptName}`);

	const hosts = ns.scan();
	if (ns.args.length < 1 || !hosts.includes(ns.args[0].toString())) {
		ns.tprint(`Hostname not exists`);
	}
	const host = ns.args[0].toString();
	ns.tprint(`On ${host}`);

	if (ns.scriptRunning(scriptName, host)) {
		ns.tprint(`Script ${scriptName} already running on host ${host}`);
		return;
	}

	if (!ns.hasRootAccess(host)) {
		if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(host)) {
			ns.tprint(`Level is too low!`);
			return;
		}
		if (ns.getServerNumPortsRequired(host) > 0) {
			ns.tprint(`Too many ports required`);
			return;
		}
		ns.nuke(host);
		ns.tprint(`Host ${host} nuked!`);
	}

	while (true) {
		ns.tprint(`Hacking ${host}...`);
		await ns.hack(host);
		ns.tprint(`${host} hacked!`);
	}
}
