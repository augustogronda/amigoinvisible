interface PostCardProps {
  children: React.ReactNode;
  className?: string;
}

export function PostCard({ children, className = "" }: PostCardProps) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className={`shadow-md relative z-10 transform rotate-2 transition-transform duration-300 p-3 bg-postcard rounded-lg ${className}`}>
      <div className="relative p-8 bg-white">
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#5CC48A] rounded-full flex items-center justify-center transform -rotate-12">
          <img className={`w-full h-full`} src={`${baseUrl}static/christmas-wreath.svg`} />
        </div>

        {children}

        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#EF3D3D] rounded-full flex items-center justify-center transform rotate-12">
          <img className={`w-full h-full`} src={`${baseUrl}static/gift-box.svg`} />
        </div>
      </div>
    </div>
  );
}
