type BannerProps = {
  title: string; // Assuming type is a string, adjust accordingly
};


export const Banner: React.FC<BannerProps> = ({title}) => {

  console.log(typeof title);
  return (
    <div className="w-full pt-12 pl-2 mx-auto text-left sm:w-full md:w-8/12 lg:w-1/2">
      <h1 className="bg-gradient-to-b from-amber-50 to-purple-500 bg-clip-text text-md font-bold text-transparent">{title}</h1>
      <p className="text-gray-300 mt-2">Please fill in the details</p>
      <hr className="mt-2 h-px my-8 bg-gray-600 border-0"/>
    </div>
  )
}
