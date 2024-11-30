import Image from "next/image";
import { ReactSVG } from "react-svg";

type UserReviewProps = {
    username: string;
    stars: number;
    description: string;
}

export const UserReview = ({username, stars, description}: UserReviewProps) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <Image src={`https://mc-heads.net/body/${username}`} alt="" width={100} height={210}/>
            <h2 className="font-extrabold text-white text-2xl">{username}</h2>
            <div className="flex gap-1">
                {[...Array(stars)].map((_, index) => (
                    <Image key={index} src="/icons/star.svg" width={16} height={16} alt=""/>
                ))}
            </div>
            <p className="text-white">{description}</p>
        </div>
    )
}