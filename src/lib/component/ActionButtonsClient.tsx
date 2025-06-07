'use client'

import Image from "next/image";
import Link from "next/link";
import css from "@/app/css/guides/chapterLink.module.css";
import { useRouter } from "next/navigation";

import editImage from "@/images/buttons/edit.png";
import deleteImage from "@/images/buttons/delete.png";

export default function ActionButtonsClient({ user, strat }) {
  const router = useRouter()
  async function deleteStrat(stratID, chapterLink) {
    try {
      const res = await fetch(`/api/strats/delete?stratID=${stratID}`);
      const data = await res.json();
      console.log(data)
      if(data.status = "SUCCESS"){
            console.log(chapterLink)
            if(chapterLink != undefined) router.push(`/guides/${chapterLink}`)
            router.refresh()

      }
      // Optionally trigger UI updates here (e.g. refresh or remove item)
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  }

  if (user.error != null) return null;
  if (user.banned === 1) return null;
  if (user.userID !== strat.userID && user.userRole < 1) return null;

  return (
    <div className={css.buttons}>
      <Link href={`/guide/edit?stratID=${strat.stratID}`}>
        <button style={{ backgroundColor: 'rgb(221, 133, 2)' }} className={css.button}>
          <Image
            src={editImage}
            alt="Edit"
            width={30}
            height={30}
            style={{ marginLeft: "1px" }}
          />
        </button>
      </Link>

      <button
        style={{ backgroundColor: 'rgb(221, 2, 2)' }}
        className={css.button}
        onClick={() => deleteStrat(strat.stratID, strat.chapterLink)}
      >
        <Image
          src={deleteImage}
          alt="Delete"
          width={25}
          height={25}
          style={{ marginTop: "2px" }}
        />
      </button>
    </div>
  );
}