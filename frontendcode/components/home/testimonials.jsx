import { IoStar, IoChevronBack, IoChevronForward } from 'react-icons/io5';

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Verified Owner",
    roleColor: "text-primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3WkGFTNUm9ClQoPNAnBhUbmLe8g6jJGUfA7xhap-qPX3WziK4jlV8fHT41sUixgLBFU90E6MPFnKg_WSbhdB850ZdOAUCJEy5eKWfIFoQWpValYdLMIFk0jTIABlC8OG-n28LpzNYmmGJzpYcZM_zCI9ujllRM_nUAMnJ0pPvM9cBpcMX5FN6AHdnM4VF9-Mz0CkHbYTpRO6NRDEpdK_7saHI19vb42xGjVVllCIegD1GOoTp-sfwkGKAf4sTBM1iRuF0SexVkmeT",
    quote: "Finding a luxury property in Nashik was easier than I imagined. UrbanPlek provided verified listings that gave me complete peace of mind during the entire buying process.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Deshmukh",
    role: "Premium Resident",
    roleColor: "text-primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYOecZam8veRVo66TDvxQYplsQFIkRUKu_EfY3zt0MHqXqAa9TNhbveTaoxnlyQWGV6MX38AofnKsFRtMvCLeaJ_UIAyX8qsq1CI87UHoPuXWNQyer6A6btnU61lqd0z40xVC9-B2-hIXnhPVeQIYNW-cuUDIVsHQjCsIJNV80G4vDr20FO87kDVlkYZTQCtt8J0uBFmPLyXZwv1hYhSrmYupji8HWqXHhihsAuzVfBNCbefy7gvl0eb0sfAFhrlaMy6qLZv5DNFhW",
    quote: "Switching to this community has been a life-changer. The amenities are world-class and the management is incredibly responsive. Highly recommended for young professionals!",
    rating: 5,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Aniket Kulkarni",
    role: "Student",
    roleColor: "text-primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfLmuIl4QOICgKNBrOjx_hMwdnIRcsBeTpXP7fpORDmVM8kFM946iAAfRsKvdXxfiIr2vskBDWtmZ13cfFBf7E0kNlpxpJqEl5j5xVEq__KyNMxv8F5-C9PEd9dPVh8DR-y05j9DmgEe6NTy82tgkUJuSOPHIW3QVWoMIStzDDfEErbvL6P576dEHn9yzR63fAR6iJpBN9xnrp2wsOTemz0otqu6pHIiECM_Gj8mpAXIOZ38KRwGtxq14oUHOJMRM87QAADI5QI1QN",
    quote: "As a student new to the city, UrbanPlek helped me find a safe, modern co-living space near my college. The seamless collaboration between teams made everything so easy.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="relative z-10 w-full max-w-7xl px-6 py-20 mx-auto font-sans">
      <div className="text-center mb-16 relative">
        <div className="inline-block relative">
          <div className="absolute -top-5 -left-4 w-[60px] h-[30px] border-t-[3px] border-primary rounded-t-[50%] -rotate-12" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            Stories from our <span className="text-primary">Community</span>
          </h1>
        </div>
        <p className="max-w-2xl mx-auto text-slate-500 text-sm md:text-base leading-relaxed">
          Discover real stories from our residents and owners who've unlocked premium living,
          efficiency, and success with UrbanPlek's real estate solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`bg-white border border-slate-100 rounded-[24px] p-8 flex flex-col items-center text-center shadow-xl shadow-slate-200/50 transition-all duration-300 ${testimonial.isFeatured ? 'ring-2 ring-primary ring-offset-4 ring-offset-white scale-105 z-10' : 'hover:-translate-y-1'}`}
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mb-6 ring-4 ring-slate-50">
              <img
                src={testimonial.image}
                alt={`${testimonial.name} Avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-xl mb-1 text-slate-900">
              {testimonial.name}
            </h3>
            <p className={`text-sm font-medium mb-6 ${testimonial.isFeatured ? 'uppercase tracking-wider text-primary' : 'text-primary'}`}>
              {testimonial.role}
            </p>
            <p className="text-slate-600 text-sm leading-loose mb-8 flex-grow italic">
              "{testimonial.quote}"
            </p>
            <div className="flex gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <IoStar
                  key={i}
                  className={`w-5 h-5 fill-current ${i < testimonial.rating ? 'text-primary' : 'text-slate-300 opacity-30'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-6 mt-12">
        <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all group text-slate-600">
          <IoChevronBack className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all group text-slate-600">
          <IoChevronForward className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
