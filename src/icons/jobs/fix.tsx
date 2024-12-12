import { SVGProps } from "react"

function Fix(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="48"
      height="30"
      viewBox="0 0 48 30"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_253_1269)">
        <path d="M11.7984 12.4506C10.4703 12.6285 9.26082 12.7233 8.06319 12.9605C6.47426 13.2688 4.90904 13.6957 3.33197 14.0514C3.01181 14.1226 2.66794 14.1463 2.33592 14.1344C2.19363 14.1226 1.98019 13.9684 1.95647 13.8498C1.9209 13.7194 2.03948 13.5178 2.15805 13.4111C2.27663 13.2925 2.46636 13.2214 2.63236 13.1858C5.66794 12.5455 8.69165 11.9289 11.7272 11.2649C12.0474 11.1937 12.498 10.9565 12.5928 10.6957C13.3399 8.67987 14.0039 6.64034 14.7391 4.50596C13.9446 4.68382 13.1976 4.82612 12.4743 5.0277C9.87742 5.78659 7.29244 6.59291 4.88533 7.82612C4.29244 8.13442 3.66398 8.44272 3.18968 8.89331C2.75094 9.30833 2.49007 9.90121 2.13434 10.4111C2.01576 10.589 1.82604 10.8854 1.73118 10.8735C1.49402 10.8261 1.11458 10.6364 1.10272 10.4704C1.06715 10.0909 1.10272 9.64034 1.29244 9.30833C1.86161 8.31228 2.79837 7.70754 3.7707 7.16208C6.10667 5.85774 8.62051 4.94469 11.1936 4.25695C14.3241 3.42691 17.4545 2.63244 20.6324 2.00398C23.6324 1.4111 26.7035 1.16208 29.7747 1.19766C30.415 1.20951 31.079 1.28066 31.7075 1.43481C32.3596 1.58896 32.4308 2.01584 32.0039 2.54944C31.577 3.08303 31.0316 3.18975 30.415 3.04746C30.2727 3.01189 30.166 2.79845 30.0474 2.66801C30.0948 2.58501 30.1304 2.502 30.1778 2.40714C29.6798 2.336 29.1699 2.15813 28.6837 2.20556C26.7391 2.37157 24.7826 2.53758 22.8616 2.82216C20.8577 3.13046 18.8656 3.58106 16.8735 3.9605C16.3517 4.05536 16.0909 4.32809 15.9249 4.84983C15.2964 6.75892 14.6561 8.62058 14.0395 10.4941C14.0039 10.589 13.992 10.6838 13.9565 10.8735C14.2648 10.8735 14.5256 10.8973 14.7865 10.8735C16.6482 10.6482 18.5098 10.3992 20.3715 10.1739C20.917 10.1028 21.4743 10.1028 22.0316 10.0791C22.411 10.0672 22.7549 10.1147 22.7905 10.6127C22.8142 11.1107 22.494 11.4546 21.9723 11.502C20.9288 11.585 19.8853 11.6206 18.8419 11.7392C17.3359 11.8933 15.83 12.1186 14.3122 12.2846C13.5652 12.3676 13.1264 12.7589 12.8893 13.4348C12.0711 15.7352 11.2766 18.0475 10.4466 20.3479C9.86556 21.9368 9.24896 23.5257 8.64422 25.1028C8.56122 25.3162 8.41892 25.5178 8.30035 25.7194C8.13434 25.9921 7.94462 26.1937 7.57703 26.0277C7.20944 25.8617 7.13829 25.5771 7.24501 25.2451C7.39916 24.7708 7.57703 24.3202 7.74304 23.8577C9.05924 20.2649 10.3873 16.672 11.7035 13.0909C11.7509 12.9486 11.7391 12.8064 11.7984 12.4506Z" />
        <path d="M38.8221 14.7154C39.4743 14.0277 40.0079 13.4229 40.5889 12.8656C41.4427 12.0356 42.3202 11.253 43.1858 10.4348C43.5178 10.1265 43.9091 9.92491 44.2648 10.3399C44.6087 10.7431 44.3834 11.087 44.0514 11.4071C42.6166 12.7945 41.1937 14.1937 39.7707 15.581C39.6285 15.7115 39.5217 15.8656 39.4387 16.1858C40.1502 16.1146 40.8617 16.0791 41.5494 15.9486C42.3083 15.8182 43.0435 15.581 43.8024 15.4625C44.087 15.415 44.5968 15.4862 44.6798 15.6522C44.8696 16.0672 44.502 16.3636 44.1344 16.4822C42.3202 17.0514 40.5178 17.7984 38.5494 17.2411C38.4308 17.2055 38.2055 17.3123 38.1225 17.419C37.1265 18.6878 36.2134 19.9921 36.0711 21.664C36.0356 22.0553 35.8221 22.3044 35.419 22.2806C35.004 22.2569 34.7787 22.0198 34.7787 21.581C34.8024 20.3241 35.3715 19.2569 35.9763 18.2253C36.3202 17.6324 36.7352 17.0751 37.1621 16.5297C37.3992 16.2332 37.5059 15.9605 37.4229 15.5573C37.3518 15.2253 37.4111 14.8577 37.4111 14.4071C37.0079 14.6561 36.6522 14.8814 36.2964 15.1067C34.2688 16.3636 32.1462 17.3478 29.7036 17.3123C29.17 17.3123 28.6364 17.2411 28.1146 17.1463C27.0474 16.9802 26.2648 16.3992 25.7668 15.4387C25.6956 15.2965 25.6126 15.166 25.5415 15.0237C25.5178 14.9882 25.4822 14.9763 25.3873 14.8933C25.1146 15.1423 24.8063 15.3795 24.5336 15.6522C23.1107 17.0514 21.7233 18.4862 20.2648 19.8498C19.7075 20.3597 19.0079 20.7273 18.3557 21.1067C18.0119 21.3083 17.6205 21.2253 17.4783 20.8103C17.336 20.4427 17.4664 20.0751 17.8577 19.921C19.1739 19.4229 20.1344 18.4387 21.1186 17.502C22.4704 16.1976 23.7391 14.8103 25.0672 13.4941C25.2925 13.2806 25.6838 13.0791 25.9565 13.1265C26.1344 13.1621 26.3241 13.6245 26.3715 13.9091C26.5613 15.166 27.3439 15.8301 28.8379 16.0316C31.0079 16.3281 32.9289 15.6166 34.7668 14.6087C35.5138 14.1937 36.2134 13.7194 36.9368 13.2688C38.1344 12.5218 38.751 12.8419 38.7984 14.2411C38.7747 14.336 38.7866 14.4308 38.8221 14.7154Z" />
        <path d="M46.0553 21.9369C46.0434 22.8499 45.7707 23.1345 45.0237 23.1108C41.1699 22.9804 37.3755 23.4547 33.5929 24.1187C27.7351 25.1503 22.0079 26.6918 16.3399 28.4823C15.4743 28.7551 14.6205 29.0396 13.7549 29.3242C13.6719 28.5416 13.8261 28.2689 14.5138 28.0317C21.0118 25.8499 27.6047 24.0476 34.3636 22.8618C37.7786 22.257 41.2055 21.8539 44.668 21.8657C45.1185 21.8657 45.5691 21.9132 46.0553 21.9369Z" />
        <path d="M26.336 11.834C26.1462 11.5849 25.8498 11.3596 25.8024 11.0869C25.7312 10.7075 25.9802 10.3992 26.3952 10.3755C26.8458 10.3517 27.1423 10.6245 27.1067 11.0395C27.083 11.3122 26.7865 11.5612 26.6087 11.8221C26.5138 11.834 26.419 11.834 26.336 11.834Z" />
      </g>
      <defs>
        <clipPath id="clip0_253_1269">
          <rect width="47.0751" height="30" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Fix
