import { SVGProps } from "react"

function Refresco(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="85"
      height="30"
      viewBox="0 0 85 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M83.9616 11.5357C83.9616 11.5357 83.6668 11.3883 83.0772 11.1672C82.4876 10.9092 81.64 10.6144 80.5345 10.2091C79.9818 10.0248 79.3921 9.80371 78.692 9.5826C78.0287 9.3615 77.2917 9.10354 76.5178 8.88244C76.1124 8.77189 75.7439 8.62449 75.3017 8.51393C74.8964 8.40338 74.4542 8.29283 74.0119 8.14543C73.5697 8.03487 73.1275 7.88747 72.6485 7.77692C72.1694 7.66637 71.7272 7.55582 71.2113 7.40841C70.7322 7.29786 70.2532 7.15046 69.7373 7.03991C69.2214 6.92936 68.7055 6.8188 68.1896 6.70825C67.6736 6.5977 67.1209 6.48715 66.605 6.33975C66.0522 6.22919 65.4995 6.11864 64.9467 6.04494C64.3939 5.93439 63.8043 5.82384 63.2516 5.71328C62.662 5.63958 62.1092 5.52903 61.5196 5.45533C60.93 5.34478 60.3404 5.27108 59.7507 5.16052C59.1611 5.08682 58.5347 5.01312 57.9082 4.93942C56.6921 4.79202 55.4392 4.60776 54.1495 4.53406C53.523 4.46036 52.8597 4.42351 52.2332 4.34981C51.6068 4.27611 50.9434 4.23926 50.2801 4.20241C49.6168 4.16556 48.9904 4.12871 48.327 4.09186C47.6637 4.05501 47.0373 4.01815 46.374 4.01815C45.0473 3.9813 43.7576 3.9813 42.4309 3.94445C41.1043 3.9813 39.7777 3.9813 38.4511 4.01815C37.7878 4.01815 37.1245 4.05501 36.498 4.09186C35.8347 4.12871 35.2082 4.16556 34.5449 4.20241C33.9184 4.23926 33.2551 4.27611 32.6287 4.34981C32.0022 4.42351 31.3389 4.46036 30.7124 4.53406C29.4227 4.60776 28.2066 4.79202 26.9537 4.93942C26.3272 5.01312 25.7376 5.08682 25.1111 5.16052C24.5215 5.27108 23.9319 5.34478 23.3423 5.45533C22.7527 5.56588 22.1631 5.63958 21.6103 5.71328C21.0207 5.82384 20.468 5.93439 19.9152 6.04494C19.3624 6.15549 18.8097 6.26604 18.2569 6.33975C17.7042 6.4503 17.1883 6.56085 16.6723 6.70825C16.1564 6.8188 15.6405 6.92936 15.1246 7.03991C14.6087 7.15046 14.1296 7.29786 13.6506 7.40841C13.1715 7.51897 12.6925 7.62952 12.2134 7.77692C11.7712 7.88747 11.2922 8.03487 10.8499 8.14543C10.4077 8.25598 9.96553 8.36653 9.56017 8.51393C9.15481 8.62449 8.74946 8.77189 8.3441 8.88244C7.57024 9.10354 6.83322 9.3615 6.16991 9.5826C5.5066 9.80371 4.88014 10.0248 4.32738 10.2091C3.22186 10.6144 2.37429 10.9461 1.78468 11.1672C1.19507 11.3883 0.900269 11.5357 0.900269 11.5357C0.900269 11.5357 1.15822 11.3514 1.71098 11.0198C2.26374 10.6881 3.03761 10.2091 4.06942 9.6563C5.10124 9.10354 6.39101 8.44023 7.90189 7.81377C8.2704 7.66637 8.67576 7.48212 9.08111 7.29786C9.48647 7.11361 9.89183 6.96621 10.334 6.78195C10.7762 6.5977 11.2184 6.4503 11.6607 6.26604C12.1029 6.11864 12.5819 5.93439 13.061 5.75014C13.54 5.56588 14.0191 5.41848 14.535 5.23423C15.0509 5.08682 15.5668 4.90257 16.0827 4.75517C16.5986 4.60777 17.1514 4.42351 17.6673 4.27611C18.2201 4.12871 18.7728 3.9813 19.3256 3.8339C19.8784 3.6865 20.468 3.5391 21.0576 3.39169C21.6472 3.28114 22.2368 3.13374 22.8264 2.98634C23.416 2.87578 24.0425 2.72838 24.6321 2.58098C25.2585 2.47043 25.885 2.35988 26.5115 2.24932C27.1379 2.13877 27.7644 2.02822 28.3909 1.91767C29.0173 1.80712 29.6806 1.73341 30.3071 1.65971C31.5969 1.51231 32.9235 1.29121 34.2501 1.21751C34.9134 1.18065 35.5767 1.10695 36.2769 1.0701C36.9402 1.03325 37.6404 0.959551 38.3037 0.959551C39.6303 0.9227 40.9938 0.88585 42.3572 0.848999C43.7207 0.88585 45.0842 0.9227 46.4108 0.959551C47.0741 0.959551 47.7743 1.03325 48.4376 1.0701C49.1009 1.10695 49.7642 1.18065 50.4275 1.21751C51.7542 1.29121 53.0808 1.47546 54.3706 1.65971C55.0339 1.73341 55.6603 1.80712 56.2868 1.91767C56.9133 2.02822 57.5397 2.13877 58.1662 2.24932C58.7926 2.35988 59.4191 2.47043 60.0456 2.58098C60.672 2.72838 61.2616 2.83893 61.8512 2.98634C62.4408 3.13374 63.0305 3.24429 63.6201 3.39169C64.2097 3.5391 64.7624 3.6865 65.352 3.8339C65.9048 3.9813 66.4576 4.12871 67.0103 4.27611C67.5631 4.42351 68.079 4.60777 68.5949 4.75517C69.1108 4.90257 69.6267 5.08682 70.1426 5.23423C70.6585 5.41848 71.1376 5.56588 71.6167 5.75014C72.0957 5.93439 72.5748 6.08179 73.017 6.26604C73.4592 6.4503 73.9014 6.63455 74.3436 6.78195C74.7858 6.96621 75.1912 7.11361 75.5965 7.29786C76.0019 7.48212 76.3704 7.62952 76.7757 7.81377C77.5496 8.14543 78.2129 8.47708 78.8762 8.77189C79.5027 9.06669 80.0923 9.39835 80.6082 9.6563C81.64 10.2091 82.4507 10.6881 83.0035 11.0198C83.6668 11.3146 83.9616 11.5357 83.9616 11.5357V11.5357Z" fill="white" />
      <path d="M32.2234 13.5259C29.2385 13.5259 28.7226 16.0317 28.7226 17.5794V18.2056H28.1699C28.1699 18.2056 27.6172 19.5322 27.2119 20.0481L28.7226 20.085V26.0552C28.7226 27.1607 28.6122 27.8979 28.1332 28.7823L31.7074 28.7449C31.4126 28.1921 31.1546 27.6768 31.1546 26.2028V20.085H33.3657V18.1323H31.1546V17.0268C31.1546 16.4003 31.7445 15.3685 32.5552 15.3685C33.2554 15.3685 33.8447 15.4421 34.1027 15.958C34.2501 14.963 34.2868 14.9263 34.5079 13.8945C33.9551 13.7839 32.9973 13.526 32.2234 13.526V13.5259ZM10.1865 13.5627L6.31714 13.5996C6.46454 14.1155 6.72235 14.9629 6.72235 16.7686L6.75978 24.839C6.75978 26.1657 6.6855 27.2716 6.35385 28.7825H10.2232C9.81781 27.1611 9.78124 26.6819 9.78124 25.5026V22.7388C12.9504 26.9398 13.3188 27.0137 15.3455 28.7825H18.1093C16.3037 26.6083 14.2036 24.3604 12.8401 21.9651C13.5403 21.5966 16.1934 21.1913 16.1934 17.9115C16.1934 15.8479 14.9402 13.4892 10.1865 13.5629V13.5627ZM9.78124 15.7371C11.808 15.8845 12.8768 16.9901 12.8768 18.0957C12.8768 20.4172 10.4814 20.5274 9.78124 20.6011V15.7371V15.7371ZM40.7725 17.874C39.9618 17.874 39.4092 18.5747 38.3405 20.1224V19.6064C38.3405 18.9062 38.3408 18.6851 38.4513 18.1324H35.2816C35.6133 19.1273 35.6134 19.6064 35.6134 19.9749V26.7556C35.6134 27.7505 35.5396 28.119 35.0974 28.7823H38.8933C38.5247 28.1559 38.3772 27.8239 38.3772 26.2762V21.6332C38.7826 21.2278 39.3726 20.1224 40.4781 20.1224C40.8835 20.1224 41.1777 20.3067 41.5462 20.6752L41.878 18.2425C41.5464 18.0951 41.2147 17.874 40.7725 17.874V17.874ZM72.7591 17.9114C71.0272 18.4273 68.4846 19.4587 68.4846 23.9176C68.4846 27.6027 71.359 29.0767 73.4595 29.0767C74.7492 29.0767 78.6553 27.7502 78.6553 23.1439C78.6184 19.9747 75.6703 17.8008 72.7591 17.9114V17.9114ZM22.458 17.9483C19.9522 17.9483 17.9618 20.1224 17.9618 23.6601C17.9618 26.0554 19.7306 29.151 23.1209 29.151C24.1159 29.151 24.706 28.7819 25.3694 28.5608L26.2165 26.0921C25.0004 26.6449 24.6321 26.8291 23.7845 26.8291C21.426 26.8291 20.7993 24.8023 20.7256 24.0653H26.3273C26.3273 22.9229 26.4747 22.1124 26.3273 21.2648C26.0325 19.238 24.19 17.9483 22.458 17.9483ZM47.1479 17.9483C44.6421 17.9483 42.6517 20.0116 42.6517 23.5493C42.6517 25.9445 44.0526 29.0401 47.4797 29.0401C48.4747 29.0401 49.1743 28.7819 49.8376 28.5608L50.7963 26.0921C49.5802 26.6449 49.4328 26.8291 48.5853 26.8291C46.2268 26.8291 45.4892 24.8023 45.4155 24.0653L51.0173 23.9545C51.0173 22.8121 51.0538 22.0015 50.9064 21.154C50.6116 19.1272 48.8799 17.9483 47.1479 17.9483V17.9483ZM56.0655 17.9483C53.5228 17.9483 52.4913 19.9747 52.4913 21.154C52.4913 22.8491 53.8916 23.8811 54.5181 24.4338C55.513 25.2814 55.7711 25.7239 55.7711 26.2029C55.7711 26.7926 55.2921 27.1976 54.6656 27.1976C54.0392 27.1976 53.1912 26.9031 52.1962 26.0187L52.1595 28.5241C53.4861 28.9295 54.4811 29.0401 54.739 29.0401C56.9869 29.0401 58.2031 27.566 58.2031 25.7603C58.2031 24.2863 57.6502 23.402 56.5816 22.5913C55.8077 22.0017 55.1075 21.5962 55.1075 20.7855C55.1075 20.2695 55.8076 19.8275 56.434 19.8275C56.9131 19.8275 57.6134 19.9383 58.0556 20.3068H58.0923V18.3902C57.3553 18.0954 56.9131 17.9483 56.0655 17.9483ZM65.1681 17.9851C60.488 17.9851 59.3087 21.7068 59.3087 23.9546C59.3087 26.4605 61.6304 28.9669 64.2468 28.9669C65.0207 28.9669 66.0152 28.9299 66.5679 28.8193L67.6001 26.1657C67.0841 26.4605 66.2736 26.8293 65.3523 26.8293C64.4679 26.8293 62.1459 25.9447 62.1459 23.3651C62.1459 22.0385 62.7722 19.7909 64.9464 19.7909C66.1993 19.7909 66.863 20.5645 67.0473 20.7856L67.305 18.3169C66.7522 18.2064 66.0893 17.9851 65.1681 17.9851V17.9851ZM72.685 19.6801C73.7905 19.6801 75.7072 20.9699 75.7072 23.5494C75.7072 25.9447 74.6014 26.9767 74.3066 27.1978C72.5009 27.3452 71.1009 24.9129 71.1009 23.3651C71.1009 21.8174 72.1691 19.6801 72.685 19.6801ZM22.3472 19.7909C23.2316 19.7909 24.0055 20.749 24.0055 22.3705H20.4312C20.4312 21.265 21.2417 19.7909 22.3472 19.7909V19.7909ZM46.8896 19.7909C47.7003 19.7909 48.5114 20.4542 48.4377 22.3705H45.2313C45.3787 20.5648 46.1525 19.7909 46.8896 19.7909V19.7909Z" fill="white" />
    </svg>
  )
}

export default Refresco
