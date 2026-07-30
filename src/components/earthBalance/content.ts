import { Compass, PawPrint, Thermometer, Waves, type LucideIcon } from 'lucide-react';

export interface BalanceSectionContent {
	id: string;
	icon: LucideIcon;
	title: string;
	body: string;
	fact: string;
}

export const BALANCE_SECTIONS: readonly BalanceSectionContent[] = [
	{
		id: 'axe',
		icon: Compass,
		title: "Stabilisation de l'axe terrestre",
		body: "L'inclinaison de l'axe de la Terre (environ 23,4°) varie aujourd'hui dans une plage étroite, sur des cycles d'environ 41 000 ans. La gravité de la Lune joue un rôle clé dans cette stabilité : sans un compagnon aussi massif, des simulations suggèrent que l'obliquité terrestre pourrait dériver de façon bien plus chaotique sur le long terme. Cette inclinaison stable est ce qui nous donne des saisons régulières plutôt qu'un climat imprévisible.",
		fact: "Sur Mars, dépourvue d'un grand satellite stabilisateur, l'inclinaison de l'axe a probablement connu des variations bien plus importantes au cours de son histoire.",
	},
	{
		id: 'marees',
		icon: Waves,
		title: 'Les marées',
		body: "L'attraction gravitationnelle de la Lune (complétée par celle, plus faible, du Soleil) déforme légèrement les océans, créant les marées. Selon l'alignement Terre-Soleil-Lune, on observe des marées de vive-eau (plus amples, autour des nouvelles et pleines lunes) ou de morte-eau (plus faibles, aux quartiers). Ce phénomène façonne les écosystèmes côtiers depuis des centaines de millions d'années.",
		fact: "Les frottements liés aux marées éloignent lentement la Lune de la Terre, d'environ 3,8 cm par an — mesuré avec précision grâce à des réflecteurs laser posés sur la Lune par les missions Apollo.",
	},
	{
		id: 'faune',
		icon: PawPrint,
		title: 'Rythme circadien et cycles de la faune',
		body: "De nombreuses espèces synchronisent des comportements clés sur le cycle lunaire : les coraux de la Grande Barrière déclenchent une ponte de masse quelques nuits après certaines pleines lunes, des tortues marines calent leur nidification sur les marées, et de nombreux prédateurs nocturnes adaptent leur activité à la luminosité lunaire. Chez l'humain en revanche, un lien entre pleine lune et qualité du sommeil a été suggéré par quelques études, mais les résultats restent débattus et n'ont pas été clairement confirmés.",
		fact: "La ponte synchronisée des coraux, l'un des plus grands événements de reproduction du vivant, reste en partie mystérieuse : la lumière lunaire jouerait un rôle de signal, mais les mécanismes exacts sont encore étudiés.",
	},
	{
		id: 'climat',
		icon: Thermometer,
		title: 'Régulation indirecte du climat',
		body: "La Lune n'agit pas directement sur la température terrestre, mais son rôle stabilisateur sur l'inclinaison de l'axe a un effet indirect important : une obliquité stable maintient une répartition régulière de l'ensoleillement selon les saisons et les latitudes. Sans cette stabilité, l'alternance des saisons pourrait devenir bien plus irrégulière et extrême sur des échelles de temps géologiques.",
		fact: "Les variations d'obliquité et d'orbite terrestre (cycles de Milankovitch) sont aujourd'hui reconnues comme l'un des moteurs des grandes glaciations passées.",
	},
];
