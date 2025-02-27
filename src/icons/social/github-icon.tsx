import { JSX, SVGProps } from "react"

function GithubIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      className="w-4 h-4 z-10 transition-colors group-hover:fill-darkGrey"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M8.01017 0.0301526C6.10859 0.0281752 4.26848 0.719081 2.81958 1.97906C1.37069 3.23904 0.407718 4.98573 0.103252 6.90611C-0.201213 8.82649 0.172727 10.795 1.15805 12.459C2.14338 14.1229 3.67568 15.3735 5.48038 15.9865C5.87827 16.0619 6.02563 15.8056 6.02563 15.5895C6.02563 15.3734 6.02563 14.8809 6.02563 14.1974C3.80039 14.7 3.32882 13.1018 3.32882 13.1018C3.18054 12.6065 2.86554 12.181 2.43971 11.9007C1.71761 11.3981 2.49865 11.3981 2.49865 11.3981C2.75178 11.4347 2.99345 11.5297 3.20536 11.676C3.41728 11.8223 3.59388 12.016 3.7218 12.2424C3.83049 12.4441 3.97702 12.6218 4.15299 12.7653C4.32896 12.9089 4.53091 13.0154 4.74724 13.0789C4.96358 13.1424 5.19004 13.1616 5.41363 13.1354C5.63722 13.1091 5.85354 13.0379 6.05019 12.9259C6.08102 12.5125 6.25523 12.1239 6.54141 11.8303C4.76319 11.6243 2.89654 10.9207 2.89654 7.7847C2.88433 6.97205 3.17805 6.18572 3.71688 5.5885C3.47641 4.88199 3.50447 4.10879 3.79548 3.42246C3.79548 3.42246 4.46845 3.20132 5.99615 4.26173C7.308 3.89323 8.69268 3.89323 10.0045 4.26173C11.5322 3.20132 12.2003 3.42246 12.2003 3.42246C12.4943 4.10781 12.5242 4.88158 12.2838 5.5885C12.8226 6.18572 13.1164 6.97205 13.1041 7.7847C13.1041 10.9308 11.2326 11.6193 9.44945 11.8052C9.64065 12.0019 9.78829 12.2383 9.88237 12.4984C9.97645 12.7585 10.0148 13.0363 9.9947 13.3129C9.9947 14.4085 9.9947 15.293 9.9947 15.5594C9.9947 15.8257 10.1372 16.0318 10.5449 15.9564C12.3439 15.3375 13.8695 14.085 14.8497 12.4221C15.8298 10.7593 16.2008 8.79433 15.8963 6.87767C15.5918 4.96102 14.6318 3.21735 13.1874 1.95765C11.743 0.697949 9.90814 0.0041503 8.01017 0V0.0301526Z" />
    </svg>
  )
}

export default GithubIcon
