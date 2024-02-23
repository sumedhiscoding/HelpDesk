import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
const Card = () => {
    const [clicked,setClicked]=useState(false)
    const router = useRouter();
    const handleOnClick=()=>{
        router.push("/dashboard");
    }
  return (
    <div>
        {clicked ? (<div>
            <div>Facebook Integration Page</div>
            <div>Integrated Page : HelperDesk</div>
            <div><button>Delete Integration</button></div>
            <div><button onClick={handleOnClick}>Reply to Messages</button></div>




        </div>) : (<div>
        <div>Facebook Page Integration</div>
        <div><button onClick={handleOnClick}>Connect Page</button></div>
        </div>)}

    </div>
  )
}

export default Card