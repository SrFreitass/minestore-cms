import { getEndpoints } from "@/api";
import { fetcher } from "@/api/client/fetcher";
import { Container } from "@/components/base/container/container";
import { Card } from "@layout/card/card";
import Image from "next/image";
import { ReactSVG } from "react-svg";
import { TeamView } from "./team-view";


const { getSettings } = getEndpoints(fetcher);

export default async function Page() {
    const settings = await getSettings();

    return (
        <>
            <div className="flex-col rounded-[10px] bg-card">
                <div className="p-4">
                    <Container className="bg-royal-red p-3 rounded-md text-center font-bold text-white flex justify-center gap-3">
                        <Image src="/icons/control-game.svg" alt="Control" width={24} height={24} />
                        <h2>Quer fazer parte da nossa equipe?</h2>
                    </Container>

                    <TeamView settings={settings}/>
                </div>

            </div>
        </>
    );
}