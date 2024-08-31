// import { useRouter } from "next/router";

// interface UpdateUrlParams {
//   method: string;
//   url: string;
// }

// const useUpdateUrl = () => {
//   const router = useRouter();

//   return ({ method, url }: UpdateUrlParams) => {
//     if (method && url) {
//       const encodedUrl = btoa(url);
//       const newPath = `/request/${method}/${encodedUrl}`;
//       router.replace(newPath, undefined, { shallow: true });
//     }
//   };
// };

// export default useUpdateUrl;
