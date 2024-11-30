import { TSettings } from "@/types/settings";
import { ReactSVG } from "react-svg";
import Image from 'next/image';

type TeamViewProps = {
    settings: TSettings;
};

export const TeamView = ({settings}: TeamViewProps) => {

    let countMembers: Record<string, number> = {};


    let members: Record<string, {
        name: string;
        role: string;
        avatar: string;
    }[]> = {};

    settings?.team?.members?.forEach((teamMember) => {
        if(members[teamMember.role]) {
            members[teamMember.role].push(teamMember);
            return;
        };

        countMembers[teamMember.role] = countMembers[teamMember.role] ? countMembers[teamMember.role] + 1 : 1;
        members[teamMember.role] = [teamMember];
    });

    members = {
        'CEO': [
            {
                name: 'Cezar',
                role: 'CEO',
                avatar: 'https://via.placeholder.com/150'
            }
        ],
        'DIRETOR': [
            {
                name: 'Cezar',
                role: 'DIRETOR',
                avatar: 'https://via.placeholder.com/150'
            }
        ],
    }

    countMembers = {
        'CEO': 1,
        'DIRETOR': 1
    }


    return (
        <div className="mt-8">
            <h2 className="text-orange text-2xl font-bold">Equipe</h2>
            {
                members && Object.keys(members).map((role) => {
                    return (
                    <>
                        <div 
                            key={role} 
                            className="mt-4 p-3 rounded-md font-bold text-white flex gap-2" 
                            style={{ backgroundColor: settings?.team?.role_colors[role] || '#FFAA00' }}
                        >
                            <Image src='/icons/control-game.svg' width={24} height={24} alt="Control"/>
                            {role} ({countMembers[role]})
                        </div>
                        <div className="flex flex-wrap gap-10 mt-4">
                            {
                                members[role].map((member, index) => {
                                    return (
                                        <div key={index} className="flex flex-col items-center">
                                            <img src={member.avatar} alt={member.name} className="rounded-md w-24 h-24" />
                                            <span className="text-center text-white font-bold">{member.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                    )
                })
            }
        </div>
    )
}