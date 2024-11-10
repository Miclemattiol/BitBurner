import { NS } from '@ns';
import { calculateThreads } from './utils';

// const localHackScript = 'localHack.js';

export const main = async (ns: NS) => {
	const script = ns.args[0] as string;
	if (!script) {
		ns.tprint(`Inserisci lo script da eseguire`);
		return;
	}
	const host = ns.args[1] as string;
	if (!host) {
		ns.tprint(`Inserisci l'host su cui far partire lo script`);
	}
	const target = ns.args[2] as string;
	if (!target) {
		ns.tprint(`Inserisci il server da hackerare`);
	}
	const ram = ns.getScriptRam(script);
	const threads = calculateThreads(ns, host, ram);
	if (threads == 0) {
		ns.tprint(
			`Not enough ram. Required ${ns.getScriptRam(
				script,
			)}... ${ns.getServerUsedRam(host)}GB/${ns.getServerMaxRam(host)}GB`,
		);
	}
	ns.scp(script, host);
	ns.exec(script, host, { threads }, target, threads);
};
