import { NS } from '@ns';

export async function main(ns: NS) {
	const [target, threads] = ns.args as [string, number];
	while (true) {
		await ns.hack(target, { threads });
	}
}
