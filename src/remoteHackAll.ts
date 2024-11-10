import { NS } from '@ns';
import { calculateThreads, hackBlacklist } from './utils';

const hackScript = 'makeMoney.js';

export async function main(ns: NS) {
	const hackedHosts: Set<string> = new Set();

	const portScripts = [ns.brutessh, ns.ftpcrack];
	const scriptHosts: Set<string> = new Set();

	const scanAndHack = (localhost: string) => {
		const hosts = ns.scan(localhost).filter(hackBlacklist);
		hosts.forEach((host) => {
			ns.tprint(`Hacking into ${host}`);
			if (hackedHosts.has(host)) return; // If already checked, skip
			hackedHosts.add(host);

			if (!ns.hasRootAccess(host)) {
				// Only if not root
				const hackingLevel = ns.getHackingLevel();
				const requiredHackingLevel =
					ns.getServerRequiredHackingLevel(host);
				if (hackingLevel < requiredHackingLevel) {
					ns.tprint(
						`Couldn't hack ${host}... Hacking level is ${hackingLevel}, and required is ${requiredHackingLevel}`,
					);
					return; // Hacking level is too low
				}

				const requiredPorts = ns.getServerNumPortsRequired(host);
				if (requiredPorts > portScripts.length) {
					ns.tprint(
						`Couldn't hack ${host}... Required ports are ${requiredPorts}, but available scripts are ${portScripts.length}`,
					);
					return;
				} // Too many required ports
				for (let i = 0; i < requiredPorts; i++) {
					// Run port opening script
					portScripts[i](host);
				}
				ns.nuke(host); // Nuke the server
			}

			if (ns.scriptRunning(hackScript, host)) {
				ns.tprint(`Script running on ${host}. Killing...`);
				ns.scriptKill(hackScript, host);
				ns.tprint(`Script killed on ${host}`);
			}

			const scriptRam = ns.getScriptRam(hackScript);
			const nThreads = calculateThreads(ns, host, scriptRam); // Calculate number of threads for given server
			ns.tprint(`Threads for ${host}: ${nThreads}`);
			ns.scp(hackScript, host);
			ns.exec(hackScript, host, { threads: nThreads }, host, nThreads);
			scriptHosts.add(host);

			scanAndHack(host);
		});
	};

	scanAndHack('home');
	ns.tprint(`Script ran on hosts:`);
	scriptHosts.forEach((host, buh) => {
		ns.tprint(`Host: ${host}, buh: ${buh}`);
	});
}
