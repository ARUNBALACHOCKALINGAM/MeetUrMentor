type BannerProps = {
  title: string; 
  userType: any// Assuming type is a string, adjust accordingly
};


export const Banner: React.FC<BannerProps> = ({title,userType}) => {
  return (
    <div>
      <h1 className={`${userType==="student" ? "text-studentPrimary" : "text-mentorAccent/75"} font-bold text-xl lg:text-4xl`}>{title}</h1>
      <p className={`${userType==="student" ? "text-studentSecondary" : "text-mentorAccent/50"}  mt-4`}>Please fill in the details</p>
      <hr className={`${userType==="student" ? "bg-studentSecondary" : "bg-mentorAccent/50"} mt-2 h-px my-8  border-0`}/>
    </div>
  )
}
