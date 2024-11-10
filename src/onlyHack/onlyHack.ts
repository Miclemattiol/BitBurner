import { NS } from '@ns';

export const main = async (ns: NS) => {
	const host = ns.args[0] as string;
	if (!host) return;
	const threads = (ns.args[1] ?? 1) as number;
	while (true) {
		await ns.hack(host, { threads });
	}
};
