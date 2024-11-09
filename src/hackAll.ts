import { NS } from '@ns';

const hackScript = 'hack.js';

export async function main(ns: NS) {
	const hosts: string[] = ns.scan();

	hosts.forEach((host) => {
		ns.tprint(`Starting ${hackScript} on ${host}`);
		
		ns.run(hackScript, {}, host);
		ns.tprint(`Started ${hackScript} on ${host}`);
	});
}
