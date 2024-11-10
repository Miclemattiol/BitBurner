import { NS } from '@ns';

export const main = async (ns: NS) => {
	const host = ns.args[0] as string;
	const threads = (ns.args[1] ?? 1) as number;
	if (!host) return;
	const moneyThreshold = ns.getServerMaxMoney(host) * 0.75;
	ns.tprint(`Money threshold: ${moneyThreshold}`);
	const securityThreshold = ns.getServerMinSecurityLevel(host) + 5;
	ns.tprint(`Security threshold: ${securityThreshold}`);
	while (true) {
		if (ns.getServerSecurityLevel(host) > securityThreshold) {
			await ns.weaken(host, { threads });
		} else if (ns.getServerMoneyAvailable(host) < moneyThreshold) {
			await ns.grow(host, { threads });
		} else {
			await ns.hack(host, { threads });
		}
	}
};
