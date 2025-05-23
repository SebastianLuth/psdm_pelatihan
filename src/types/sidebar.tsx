export const menuGroups = [
    {
      name: "MENU",
      menuItems: [
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                fill=""
              />
              <path
                d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                fill=""
              />
              <path
                d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                fill=""
              />
              <path
                d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                fill=""
              />
            </svg>
          ),
          label: "Dashboard",
          route: "/",
          role : "all"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 22V6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16h3V11a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v11h2a1 1 0 0 1 1 1v1H2v-1a1 1 0 0 1 1-1h0z" />
              <rect x="4" y="8" width="2" height="2" rx="0.5" />
              <rect x="4" y="12" width="2" height="2" rx="0.5" />
              <rect x="4" y="16" width="2" height="2" rx="0.5" />
              <rect x="12" y="12" width="2" height="2" rx="0.5" />
              <rect x="12" y="16" width="2" height="2" rx="0.5" />
              <rect x="20" y="16" width="2" height="2" rx="0.5" />
            </svg>
          ),
          label: "Unit Kerja",
          route: "#",
          children: [
            { label: "Tambah Unit Kerja", route: "/department/add_department" },
            { label: "Data Unit Kerja", route: "/department/department_data" },
          ],
          role : "admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 22V6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16h3V11a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v11h2a1 1 0 0 1 1 1v1H2v-1a1 1 0 0 1 1-1h0z" />
              <rect x="4" y="8" width="2" height="2" rx="0.5" />
              <rect x="4" y="12" width="2" height="2" rx="0.5" />
              <rect x="4" y="16" width="2" height="2" rx="0.5" />
              <rect x="12" y="12" width="2" height="2" rx="0.5" />
              <rect x="12" y="16" width="2" height="2" rx="0.5" />
              <rect x="20" y="16" width="2" height="2" rx="0.5" />
            </svg>
          ),
          label: "Unit Kerja",
          route: "#",
          children: [
            { label: "Tambah Unit Kerja", route: "/department/add_department" },
            { label: "Data Unit Kerja", route: "/department/department_data" },
          ],
          role : "super admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                fill=""
              />
              <path
                d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                fill=""
              />
            </svg>
          ),
          label: "Manajemen User",
          route: "#",
          children: [
            { label: "Tambah User Baru", route: "/users_manajemen/add_users" },
            { label: "Data User", route: "/users_manajemen/users_data", role : "all" },
          ],
          role : "super admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                fill=""
              />
              <path
                d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                fill=""
              />
            </svg>
          ),
          label: "Manajemen User",
          route: "#",
          children: [
            { label: "Tambah User Baru", route: "/users_manajemen/add_users" },
            { label: "Data User", route: "/users_manajemen/users_data", role : "all" },
          ],
          role : "admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 7C3 6.45 3.45 6 4 6H19C19.55 6 20 6.45 20 7V17C20 17.55 19.55 18 19 18H4C3.45 18 3 17.55 3 17V7ZM5 8V16H18V8H5ZM12 10C11.45 10 11 10.45 11 11C11 11.55 11.45 12 12 12C12.55 12 13 11.55 13 11C13 10.45 12.55 10 12 10Z" />
            </svg>
          ),
          label: "RKAP & Vendor",
          route: "#",
          children: [
            { label: "Data Anggaran RKAP", route: "/budget/budget_data" },
            { label: "Data Vendor", route: "/budget/vendor_data" },
          ],
          role : "admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 7C3 6.45 3.45 6 4 6H19C19.55 6 20 6.45 20 7V17C20 17.55 19.55 18 19 18H4C3.45 18 3 17.55 3 17V7ZM5 8V16H18V8H5ZM12 10C11.45 10 11 10.45 11 11C11 11.55 11.45 12 12 12C12.55 12 13 11.55 13 11C13 10.45 12.55 10 12 10Z" />
            </svg>
          ),
          label: "RKAP & Vendor",
          route: "#",
          children: [
            { label: "Data Anggaran RKAP", route: "/budget/budget_data" },
            { label: "Data Vendor", route: "/budget/vendor_data" },
          ],
          role : "super admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Pelatihan & Evaluasi",
          route: "#",
          children: [
            { label: "Data Pelatihan", route: "/training/training_data", role: "admin"  },
            { label: "Evaluasi Level 1", route: "/training/evaluation_training1" , role : "all" },
            { label: "Evaluasi Level  3 & 4", route: "/training/evaluation_training2",role : "all" },
            { label: "Evaluasi Feedback Peserta", route: "/training/evaluation_freetext" , role : "all" },
          ],
          role : "admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Pelatihan & Evaluasi",
          route: "#",
          children: [
            { label: "Data Pelatihan", route: "/training/training_data", role: "admin"  },
            { label: "Evaluasi Level 1", route: "/training/evaluation_training1" , role : "all" },
            { label: "Evaluasi Level  3 & 4", route: "/training/evaluation_training2",role : "all" },
            { label: "Evaluasi Feedback Peserta", route: "/training/evaluation_freetext" , role : "all" },

          ],
          role : "super admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Pelatihan & Evaluasi",
          route: "#",
          children: [
            { label: "Evaluasi Level 1", route: "/training/evaluation_training1"  },
            { label: "Evaluasi Level  3 & 4", route: "/training/evaluation_training2" },
            { label: "Evaluasi Feedback Peserta", route: "/training/evaluation_freetext" },
          ],
          role : "user"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Learning Wallet",
          route: "#",
          children: [
            { label: "Realisasi Lerning Wallet", route: "/learning-wallet"  },
            { label: "RKAP Learning Wallet", route: "/learning-wallet/rkap-learning-wallet"},
          ],
          role : "admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Learning Wallet",
          route: "#",
          children: [
            { label: "Lerning Wallet", route: "/learning-wallet"  },
            { label: "RKAP Learning Wallet", route: "/learning-wallet/rkap-learning-wallet"},
          ],
          role : "super admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Learning Wallet",
          route: "#",
          children: [
            { label: "Realisasi Lerning Wallet", route: "/learning-wallet"  },
            
          ],
          role : "user"
        },
        {
          icon: (
            <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21V9H5V21H3ZM10 21V3H12V21H10ZM17 21V14H19V21H17ZM21 7L14 14L10.5 10.5L4 17L2.5 15.5L10.5 7.5L14 11L19.5 5.5L21 7Z"
              fill="currentColor"
            />
          </svg>          
          ),
          label: "Serapan Anggaran",
          route: "#",
          children: [
            { label: "Investasi Biaya Pelatihan", route: "/profile"  },
          ],
          role : "user"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 2H14L20 8V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2ZM13 9V3.5L18.5 9H13ZM6 13H18V15H6V13ZM6 17H18V19H6V17ZM6 9H11V11H6V9Z" />
            </svg>
          ),
          label: "Laporan",
          route: "#",
          children: [
            { label: "Download Laporan Anggaran RKAP", route: "/report/download_budget" },
            { label: "Laporan Anggaran Evaluasi 1 & 3", route: "/report/download_evaluation" },
            { label: "Laporan Anggaran Pelatihan", route: "/report/download_pelatihan" },
          ],
          role : "admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 2H14L20 8V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2ZM13 9V3.5L18.5 9H13ZM6 13H18V15H6V13ZM6 17H18V19H6V17ZM6 9H11V11H6V9Z" />
            </svg>
          ),
          label: "Laporan",
          route: "#",
          children: [
            { label: "Download Laporan Anggaran RKAP", route: "/report/download_budget" },
            { label: "Laporan Anggaran Evaluasi 1 & 3", route: "/report/download_evaluation" },
            { label: "Laporan Anggaran Pelatihan", route: "/report/download_pelatihan" },
          ],
          role : "super admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Pertanyaan",
          route: "#",
          children: [
            { label: "Data Pertanyaan Level 1", route: "/question", role: "super admin"  },
            { label: "Data Pertanyaan Level 3", route: "/question_level3", role: "super admin"  },
          ],
          role : "super admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Wasiat",
          route: "#",
          children: [
            { label: "Laporan Karpel", route: "/skmbt/karpel"  },
            { label: "Laporan Karpim", route: "/skmbt/karpim"  },
          ],
          role : "admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Wasiat",
          route: "#",
          children: [
            { label: "Laporan Karpel", route: "/skmbt/karpel"  },
            { label: "Laporan Karpim", route: "/skmbt/karpim"  },
          ],
          role : "super admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "Wasiat",
          route: "#",
          children: [
            { label: "Kumpulan Wasiat Karpel", route: "/skmbt/library/karpel"  },
            { label: "Kumpulan Wasiat Karpim", route: "/skmbt/library/karpim"  },
          ],
          role : "user"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "PLANT",
          route: "#",
          children: [
            { label: "CORP. Knowledge", route: "/plant/corp-knowledge"  },
            { label: "Field Learning", route: "/plant/field-learning"  },
            { label: "Project Assigment", route: "/plant/project-assignment"  },
            { label: "Job Orientation", route: "/plant/job-orientation"  },
          ],
          role : "user"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "PLANT",
          route: "#",
          children: [
            { label: "Data PLANT", route: "/plant"  }
          ],
          role : "super admin"
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10H11C11 9.45 11.45 9 12 9C12.55 9 13 9.45 13 10C13 11.1 12.1 12 11 12V15H13V13.1C14.16 12.63 15 11.42 15 10C15 8.34 13.66 7 12 7Z" />
            </svg>
          ),
          label: "PLANT",
          route: "#",
          children: [
            { label: "Data PLANT", route: "/plant"  }
          ],
          role : "admin"
        },
      ],
    },
  ];