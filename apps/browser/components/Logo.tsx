import { clsx } from "clsx";
import { memo } from "react";

type LogoType = {
  wordmark?: boolean;
  className?: string;
  logoClassName?: string;
};

const Logo = ({ wordmark = true, className, logoClassName }: LogoType) => {
  return (
    <>
      <div className={clsx("flex", className)}>
        <svg
          viewBox={`0 0 ${wordmark ? "1912" : "613"} 613`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx("h-auto w-full", logoClassName)}
        >
          <>
            <rect
              x="16.3545"
              y="16.2844"
              width="580.592"
              height="580.592"
              rx="290.296"
              fill="url(#paint0_radial_145_4616)"
            />
            <rect
              x="16.3545"
              y="16.2844"
              width="580.592"
              height="580.592"
              rx="290.296"
              stroke="#130F08"
              strokeWidth="31.2551"
            />
            <g filter="url(#filter0_d_145_4616)">
              <path
                d="M130.884 460.696C121.394 450.228 122.321 434.217 132.857 424.802C179.013 383.558 239.926 358.486 306.695 358.486C373.464 358.486 434.377 383.558 480.533 424.802C491.069 434.217 491.996 450.228 482.506 460.696C439.1 508.573 376.409 538.642 306.695 538.642C236.981 538.642 174.29 508.573 130.884 460.696Z"
                fill="#1A1C20"
              />
              <path
                d="M130.884 460.696C121.394 450.228 122.321 434.217 132.857 424.802C179.013 383.558 239.926 358.486 306.695 358.486C373.464 358.486 434.377 383.558 480.533 424.802C491.069 434.217 491.996 450.228 482.506 460.696C439.1 508.573 376.409 538.642 306.695 538.642C236.981 538.642 174.29 508.573 130.884 460.696Z"
                stroke="#130F08"
                strokeWidth="14.7083"
                strokeLinejoin="round"
              />
            </g>
            <path
              d="M435.298 399.119C397.091 456.863 296.414 559.825 199.36 509.724"
              stroke="#130F08"
              strokeWidth="14.7083"
              strokeLinejoin="round"
            />
            <path
              d="M443.176 397.288C371.882 448.928 236.497 537.321 168.749 494.47"
              stroke="#130F08"
              strokeWidth="14.7083"
              strokeLinejoin="round"
            />
            <path
              d="M293.911 485.281C233.706 467.22 182.932 427.173 169.383 398.46"
              stroke="#130F08"
              strokeWidth="14.7083"
              strokeLinejoin="round"
            />
            <path
              d="M236.791 502.708C206.981 487.01 159.478 446.691 145.302 414.303"
              stroke="#130F08"
              strokeWidth="14.7083"
              strokeLinejoin="round"
            />
            <path
              d="M466.022 408.642C445.146 458.084 317.527 565.026 200.937 511.555"
              stroke="#130F08"
              strokeWidth="14.7083"
              strokeLinejoin="round"
            />
            <g filter="url(#filter1_d_145_4616)">
              <circle
                cx="306.65"
                cy="262.456"
                r="192.783"
                fill="url(#paint1_radial_145_4616)"
              />
            </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M306.65 450.534C407.95 450.534 490.07 377.219 490.07 286.781C490.07 274.129 488.463 261.812 485.421 249.984C478.213 343.774 400.928 417.603 306.65 417.603C212.372 417.603 135.088 343.775 127.879 249.986C124.837 261.813 123.23 274.129 123.23 286.781C123.23 377.219 205.35 450.534 306.65 450.534Z"
              fill="#1A1C20"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M393.783 434.471C456.474 402.652 499.434 337.571 499.434 262.456C499.434 155.984 413.122 69.6724 306.65 69.6724C200.179 69.6724 113.867 155.984 113.867 262.456C113.867 368.927 200.179 455.239 306.65 455.239C203.023 455.239 119.017 373.771 119.017 273.276C119.017 172.78 203.023 91.3128 306.65 91.3128C410.277 91.3128 494.284 172.78 494.284 273.276C494.284 343.27 453.532 404.034 393.783 434.471Z"
              fill="#566574"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M306.65 455.239C413.122 455.239 499.434 368.927 499.434 262.456C499.434 155.984 413.122 69.6724 306.65 69.6724C200.179 69.6724 113.867 155.984 113.867 262.456C113.867 368.927 200.179 455.239 306.65 455.239ZM306.65 449.586C410.277 449.586 494.284 367.488 494.284 266.215C494.284 164.943 410.277 82.8448 306.65 82.8448C203.023 82.8448 119.017 164.943 119.017 266.215C119.017 367.488 203.023 449.586 306.65 449.586Z"
              fill="#A1AFC2"
            />
            <path
              d="M163.418 255.944C163.418 229.054 185.918 201.615 213.905 201.615H399.392C427.38 201.615 449.879 229.054 449.879 255.944C449.879 282.834 425.733 306.431 404.331 306.431C339.515 306.431 338.984 296.844 306.649 296.844C274.312 296.844 274.693 306.431 208.966 306.431C187.564 306.431 163.418 282.834 163.418 255.944Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M213.905 193.659C185.918 193.659 163.418 225.727 163.418 253.773C163.418 257.149 163.768 260.476 164.421 263.716C169.075 240.394 189.384 222.396 213.905 222.396C237.606 222.396 253.798 220.108 268.597 218.017C281.052 216.257 292.521 214.637 306.649 214.637C320.784 214.637 332.275 216.259 344.75 218.02C359.557 220.11 375.749 222.396 399.392 222.396C423.914 222.396 444.223 240.394 448.877 263.716C449.53 260.476 449.879 257.149 449.879 253.773C449.879 225.727 427.38 193.659 399.392 193.659C375.749 193.659 359.557 196.453 344.75 199.008C332.275 201.161 320.784 203.143 306.649 203.143C292.521 203.143 281.052 201.163 268.597 199.012C253.798 196.456 237.606 193.659 213.905 193.659Z"
              fill="#B3C1D4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M174.565 289.84C182.509 306.497 198.475 318.517 213.103 318.517C250.097 318.517 265.223 315.205 277.694 312.474C286.441 310.559 293.882 308.929 306.648 308.929C319.466 308.929 327.066 310.572 335.973 312.498C348.584 315.224 363.817 318.517 400.194 318.517C414.821 318.517 430.786 306.499 438.73 289.842C429.725 301.492 416.579 309.22 404.331 309.22C366.345 309.22 350.439 305.927 337.27 303.201C327.969 301.275 320.034 299.633 306.649 299.633C293.318 299.633 285.548 301.262 276.414 303.177C263.391 305.908 247.597 309.22 208.967 309.22C196.718 309.22 183.571 301.491 174.565 289.84Z"
              fill="#27292A"
            />
            <path
              d="M163.418 255.944C163.418 229.054 185.918 193.855 213.905 193.855C259.958 193.855 275.734 201.615 306.649 201.615C337.563 201.615 352.395 193.855 399.392 193.855C427.38 193.855 449.879 229.054 449.879 255.944C449.879 282.834 425.733 306.431 404.331 306.431C339.515 306.431 338.984 296.844 306.649 296.844C274.312 296.844 274.693 306.431 208.966 306.431C187.564 306.431 163.418 282.834 163.418 255.944Z"
              stroke="#130F08"
              strokeWidth="11.9505"
            />
            <path
              d="M261.422 250.059C261.422 269.378 246.313 284.613 228.193 284.613C210.074 284.613 194.965 269.378 194.965 250.059C194.965 230.739 210.074 215.505 228.193 215.505C246.313 215.505 261.422 230.739 261.422 250.059Z"
              fill="#02B9D2"
              stroke="#130F08"
              strokeWidth="15.6276"
            />
            <path
              d="M245.143 250.059C245.143 259.722 237.555 267.555 228.194 267.555C218.834 267.555 211.245 259.722 211.245 250.059C211.245 240.396 218.834 232.562 228.194 232.562C237.555 232.562 245.143 240.396 245.143 250.059Z"
              fill="#048FA2"
            />
            <path
              d="M228.194 245.047C233.139 245.047 237.098 240.917 237.098 235.886C237.098 230.854 233.139 226.724 228.194 226.724C223.25 226.724 219.291 230.854 219.291 235.886C219.291 240.917 223.25 245.047 228.194 245.047Z"
              fill="white"
              stroke="#02B9D2"
              strokeWidth="1.83854"
            />
            <path
              d="M416.911 250.059C416.911 269.378 401.802 284.613 383.683 284.613C365.564 284.613 350.454 269.378 350.454 250.059C350.454 230.739 365.564 215.505 383.683 215.505C401.802 215.505 416.911 230.739 416.911 250.059Z"
              fill="#02B9D2"
              stroke="#130F08"
              strokeWidth="15.6276"
            />
            <path
              d="M401.419 250.059C401.419 259.722 393.83 267.555 384.47 267.555C375.109 267.555 367.521 259.722 367.521 250.059C367.521 240.396 375.109 232.562 384.47 232.562C393.83 232.562 401.419 240.396 401.419 250.059Z"
              fill="#048FA2"
            />
            <path
              d="M383.682 245.079C388.627 245.079 392.586 240.949 392.586 235.917C392.586 230.885 388.627 226.756 383.682 226.756C378.738 226.756 374.779 230.885 374.779 235.917C374.779 240.949 378.738 245.079 383.682 245.079Z"
              fill="white"
              stroke="#02B9D2"
              strokeWidth="1.83854"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M306.175 367.782C333.031 367.782 338.717 358.622 338.717 358.622C338.717 358.622 337.135 386.35 306.175 386.35C277.631 386.35 273.65 358.718 273.65 358.718C273.65 358.718 282.465 367.782 306.175 367.782Z"
              fill="#27292A"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M305.756 354.591C317.725 354.053 325.725 352.946 331.012 351.816C334.91 350.983 339.947 354.78 338.286 358.403C334.853 365.893 326.591 375.001 306.712 375.894C286.881 376.785 276.978 367.037 272.354 359.658C270.388 356.522 273.59 353.053 277.253 353.586C283.225 354.455 292.527 355.185 305.756 354.591Z"
              fill="black"
            />
            <circle
              cx="306.65"
              cy="262.456"
              r="192.783"
              stroke="#130F08"
              strokeWidth="14.7083"
            />
          </>
          {wordmark && (
            <>
              <path
                d="M1851.56 367.295C1857.54 367.295 1862.79 367.204 1867.32 367.023C1872.03 366.661 1875.93 366.117 1879.01 365.393V323.275C1877.2 322.369 1874.21 321.645 1870.04 321.101C1866.05 320.377 1861.16 320.014 1855.37 320.014C1851.56 320.014 1847.49 320.286 1843.14 320.83C1838.97 321.373 1835.08 322.551 1831.45 324.362C1828.01 325.992 1825.11 328.347 1822.76 331.427C1820.4 334.325 1819.23 338.22 1819.23 343.111C1819.23 352.169 1822.13 358.509 1827.92 362.132C1833.72 365.574 1841.6 367.295 1851.56 367.295ZM1849.39 240.67C1859.53 240.67 1868.05 242.029 1874.93 244.746C1882 247.282 1887.61 250.996 1891.78 255.887C1896.13 260.597 1899.2 266.303 1901.02 273.006C1902.83 279.527 1903.73 286.773 1903.73 294.744V383.055C1901.56 383.417 1898.48 383.961 1894.49 384.685C1890.69 385.229 1886.34 385.772 1881.45 386.316C1876.56 386.859 1871.22 387.312 1865.42 387.674C1859.8 388.218 1854.19 388.489 1848.57 388.489C1840.6 388.489 1833.27 387.674 1826.56 386.044C1819.86 384.414 1814.06 381.877 1809.17 378.436C1804.28 374.813 1800.48 370.103 1797.76 364.306C1795.04 358.509 1793.68 351.535 1793.68 343.383C1793.68 335.593 1795.22 328.891 1798.3 323.275C1801.56 317.659 1805.91 313.131 1811.35 309.689C1816.78 306.247 1823.12 303.711 1830.37 302.081C1837.61 300.45 1845.22 299.635 1853.19 299.635C1855.73 299.635 1858.36 299.816 1861.07 300.178C1863.79 300.36 1866.33 300.722 1868.68 301.265C1871.22 301.628 1873.39 301.99 1875.2 302.352C1877.01 302.715 1878.28 302.986 1879.01 303.167V296.103C1879.01 291.936 1878.55 287.86 1877.65 283.875C1876.74 279.708 1875.11 276.085 1872.76 273.006C1870.4 269.745 1867.14 267.209 1862.97 265.397C1858.99 263.405 1853.74 262.409 1847.21 262.409C1838.88 262.409 1831.55 263.043 1825.2 264.311C1819.05 265.397 1814.43 266.575 1811.35 267.843L1808.36 246.92C1811.62 245.471 1817.05 244.112 1824.66 242.844C1832.27 241.395 1840.51 240.67 1849.39 240.67Z"
                fill="#02B9D2"
              />
              <path
                d="M1717.35 436.313C1715.18 436.313 1712.37 436.042 1708.93 435.498C1705.48 434.955 1702.59 434.23 1700.23 433.324L1703.49 412.673C1705.3 413.217 1707.39 413.669 1709.74 414.032C1712.1 414.394 1714.27 414.575 1716.26 414.575C1724.96 414.575 1731.12 411.858 1734.74 406.423C1738.54 401.17 1740.45 393.381 1740.45 383.055V244.203H1765.72V382.783C1765.72 400.898 1761.55 414.303 1753.22 422.999C1745.07 431.875 1733.11 436.313 1717.35 436.313ZM1752.95 218.661C1748.42 218.661 1744.52 217.211 1741.26 214.313C1738.18 211.233 1736.64 207.158 1736.64 202.085C1736.64 197.013 1738.18 193.028 1741.26 190.129C1744.52 187.05 1748.42 185.51 1752.95 185.51C1757.47 185.51 1761.28 187.05 1764.36 190.129C1767.62 193.028 1769.25 197.013 1769.25 202.085C1769.25 207.158 1767.62 211.233 1764.36 214.313C1761.28 217.211 1757.47 218.661 1752.95 218.661Z"
                fill="#02B9D2"
              />
              <path
                d="M1589.85 248.279C1595.65 246.83 1603.35 245.29 1612.95 243.659C1622.55 242.029 1633.6 241.214 1646.1 241.214C1657.33 241.214 1666.66 242.844 1674.08 246.105C1681.51 249.184 1687.4 253.623 1691.75 259.42C1696.28 265.035 1699.45 271.828 1701.26 279.799C1703.07 287.77 1703.97 296.555 1703.97 306.156V385.5H1678.7V311.591C1678.7 302.896 1678.07 295.469 1676.8 289.309C1675.72 283.15 1673.81 278.169 1671.1 274.364C1668.38 270.56 1664.76 267.843 1660.23 266.213C1655.7 264.401 1650.08 263.495 1643.38 263.495C1640.66 263.495 1637.85 263.586 1634.96 263.767C1632.06 263.948 1629.25 264.22 1626.53 264.582C1624 264.763 1621.64 265.035 1619.47 265.397C1617.48 265.76 1616.03 266.032 1615.12 266.213V385.5H1589.85V248.279Z"
                fill="#02B9D2"
              />
              <path
                d="M1551.83 385.5H1526.56V244.203H1551.83V385.5ZM1539.06 218.661C1534.53 218.661 1530.63 217.211 1527.37 214.313C1524.29 211.233 1522.75 207.158 1522.75 202.085C1522.75 197.013 1524.29 193.028 1527.37 190.129C1530.63 187.05 1534.53 185.51 1539.06 185.51C1543.59 185.51 1547.39 187.05 1550.47 190.129C1553.73 193.028 1555.36 197.013 1555.36 202.085C1555.36 207.158 1553.73 211.233 1550.47 214.313C1547.39 217.211 1543.59 218.661 1539.06 218.661Z"
                fill="#02B9D2"
              />
              <path
                d="M1375.96 248.279C1381.76 246.83 1389.46 245.29 1399.06 243.659C1408.66 242.029 1419.71 241.214 1432.21 241.214C1443.44 241.214 1452.77 242.844 1460.2 246.105C1467.62 249.184 1473.51 253.623 1477.86 259.42C1482.39 265.035 1485.56 271.828 1487.37 279.799C1489.18 287.77 1490.09 296.555 1490.09 306.156V385.5H1464.82V311.591C1464.82 302.896 1464.18 295.469 1462.91 289.309C1461.83 283.15 1459.92 278.169 1457.21 274.364C1454.49 270.56 1450.87 267.843 1446.34 266.213C1441.81 264.401 1436.19 263.495 1429.49 263.495C1426.77 263.495 1423.97 263.586 1421.07 263.767C1418.17 263.948 1415.36 264.22 1412.64 264.582C1410.11 264.763 1407.75 265.035 1405.58 265.397C1403.59 265.76 1402.14 266.032 1401.23 266.213V385.5H1375.96V248.279Z"
                fill="#02B9D2"
              />
              <path
                d="M1344.42 370.827C1344.42 375.718 1342.78 379.975 1339.52 383.598C1336.26 387.221 1331.83 389.033 1326.21 389.033C1320.59 389.033 1316.16 387.221 1312.89 383.598C1309.63 379.975 1308 375.718 1308 370.827C1308 365.936 1309.63 361.679 1312.89 358.056C1316.16 354.433 1320.59 352.622 1326.21 352.622C1331.83 352.622 1336.26 354.433 1339.52 358.056C1342.78 361.679 1344.42 365.936 1344.42 370.827Z"
                fill="#02B9D2"
              />
              <path
                d="M1284.63 283.718C1284.63 299.899 1282.28 314.514 1277.58 327.563C1272.88 340.612 1266.23 351.834 1257.62 361.229C1249.27 370.624 1239.22 377.932 1227.47 383.152C1215.73 388.11 1202.94 390.589 1189.11 390.589C1175.28 390.589 1162.49 388.11 1150.75 383.152C1139 377.932 1128.82 370.624 1120.21 361.229C1111.86 351.834 1105.33 340.612 1100.64 327.563C1095.94 314.514 1093.59 299.899 1093.59 283.718C1093.59 267.798 1095.94 253.314 1100.64 240.265C1105.33 226.955 1111.86 215.602 1120.21 206.207C1128.82 196.812 1139 189.635 1150.75 184.676C1162.49 179.457 1175.28 176.847 1189.11 176.847C1202.94 176.847 1215.73 179.457 1227.47 184.676C1239.22 189.635 1249.27 196.812 1257.62 206.207C1266.23 215.602 1272.88 226.955 1277.58 240.265C1282.28 253.314 1284.63 267.798 1284.63 283.718ZM1246.66 283.718C1246.66 260.752 1241.44 242.614 1231 229.304C1220.82 215.733 1206.86 208.947 1189.11 208.947C1171.36 208.947 1157.27 215.733 1146.83 229.304C1136.65 242.614 1131.56 260.752 1131.56 283.718C1131.56 306.684 1136.65 324.953 1146.83 338.524C1157.27 351.834 1171.36 358.489 1189.11 358.489C1206.86 358.489 1220.82 351.834 1231 338.524C1241.44 324.953 1246.66 306.684 1246.66 283.718Z"
                fill="white"
              />
              <path
                d="M1084.48 181.936C1074.3 220.039 1062.29 256.576 1048.46 291.548C1034.89 326.519 1021.71 357.836 1008.92 385.5H976.039C963.251 357.836 949.941 326.519 936.109 291.548C922.538 256.576 910.664 220.039 900.485 181.936H939.632C942.764 194.724 946.418 208.425 950.593 223.04C955.03 237.394 959.597 251.748 964.295 266.102C969.254 280.195 974.212 293.896 979.171 307.206C984.129 320.516 988.827 332.391 993.264 342.83C997.7 332.391 1002.4 320.516 1007.36 307.206C1012.32 293.896 1017.14 280.195 1021.84 266.102C1026.8 251.748 1031.37 237.394 1035.54 223.04C1039.98 208.425 1043.76 194.724 1046.9 181.936H1084.48Z"
                fill="white"
              />
              <path
                d="M707.259 284.11C707.259 266.102 709.869 250.443 715.088 237.133C720.308 223.562 727.224 212.34 735.836 203.467C744.448 194.594 754.366 187.939 765.588 183.502C776.81 179.065 788.293 176.847 800.037 176.847C827.44 176.847 848.449 185.459 863.064 202.684C877.679 219.648 884.986 245.615 884.986 280.586C884.986 282.152 884.986 284.24 884.986 286.85C884.986 289.199 884.856 291.417 884.595 293.505H745.231C746.797 314.644 752.93 330.695 763.63 341.656C774.331 352.617 791.033 358.097 813.739 358.097C826.527 358.097 837.227 357.054 845.839 354.966C854.712 352.617 861.367 350.399 865.804 348.311L870.893 378.845C866.456 381.194 858.627 383.673 847.405 386.283C836.444 388.893 823.917 390.198 809.824 390.198C792.077 390.198 776.679 387.588 763.63 382.369C750.842 376.888 740.273 369.45 731.921 360.055C723.57 350.66 717.307 339.568 713.131 326.78C709.216 313.731 707.259 299.507 707.259 284.11ZM847.014 264.145C847.274 247.703 843.099 234.262 834.486 223.823C826.135 213.123 814.522 207.773 799.646 207.773C791.294 207.773 783.856 209.469 777.332 212.862C771.068 215.994 765.718 220.17 761.282 225.389C756.845 230.609 753.322 236.611 750.712 243.397C748.363 250.182 746.797 257.098 746.014 264.145H847.014Z"
                fill="white"
              />
            </>
          )}
          <defs>
            <filter
              id="filter0_d_145_4616"
              x="87.5502"
              y="325.392"
              width="438.289"
              height="253.698"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="3.67707" />
              <feGaussianBlur stdDeviation="14.7083" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_145_4616"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_145_4616"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_145_4616"
              x="110.19"
              y="69.6724"
              width="392.921"
              height="418.66"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="29.4166" />
              <feGaussianBlur stdDeviation="1.83854" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_145_4616"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_145_4616"
                result="shape"
              />
            </filter>
            <radialGradient
              id="paint0_radial_145_4616"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(306.651 16.2844) rotate(90) scale(580.592 580.592)"
            >
              <stop stopColor="#61D2DA" />
              <stop offset="0.369792" stopColor="#04BFDF" />
              <stop offset="1" stopColor="#032C35" />
            </radialGradient>
            <radialGradient
              id="paint1_radial_145_4616"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(306.65 92.3614) rotate(90) scale(362.877 669.027)"
            >
              <stop stopColor="#585F67" />
              <stop offset="0.342938" stopColor="#313840" />
              <stop offset="1" stopColor="#2B2F33" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default memo(Logo);
