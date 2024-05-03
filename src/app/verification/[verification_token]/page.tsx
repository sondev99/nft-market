'use client';

import authApi from '@/apis/authApi';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type VerificationProps = {};

const Verification = (props: VerificationProps) => {
  const { verification_token } = useParams<{ verification_token: string }>();
  const router = useRouter();
  console.log('params', verification_token);

  const handleActive = async (verification_token: string) => {
    const response = await authApi.activeAccount(verification_token);
    if (response.status === 'OK') {
      Swal.fire({
        title: 'Congratulations !',
        text: response.message,
        icon: 'success',
        showCloseButton: true,
        confirmButtonText: 'Close',
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          router.push('/login');
        }
      });
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col mt-5">
      <section className="max-w-2xl mx-auto bg-white">
        <header className="py-8 flex justify-center w-full">
          <a href="#">
            <img
              src="https://www.tailwindtap.com/_next/static/media/nav-logo.9a469dd4.svg"
              alt="tailwindtaplogo"
            />
          </a>
        </header>
        <div className="h-[200px] bg-[#365CCE] w-full text-white flex items-center justify-center flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="text-center text-sm sm:text-xl tracking-widest font-normal">
              THANKS FOR SIGNING UP!
            </div>
            <div className="text-xl sm:text-3xl tracking-wider font-bold capitalize">
              Verify your E-mail Address
            </div>
          </div>
        </div>
        <main className="mt-8 px-5 sm:px-10">
          <h2 className="text-gray-700 ">Hello John Deo,</h2>
          <p className="mt-2 leading-loose text-gray-600 ">
            Please click <span className="font-bold"> Button</span> below to
            verifi your accout
          </p>
          <div className="flex justify-center items-start">
            <button
              className="px-6 py-2 mt-6 text-sm font-bold tracking-wider text-white capitalize transition-colors duration-300 transform bg-orange-600 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80"
              onClick={() => handleActive(verification_token)}
            >
              Verify email
            </button>
          </div>

          <p className="mt-8 text-gray-600">
            Thank you, <br />
            Infynno Team
          </p>
        </main>
        <p className="text-gray-500  px-5 sm:px-10 mt-8">
          This email was sent from{' '}
          <a
            href="mailto:sales@infynno.com"
            className="text-[#365CCE] hover:underline"
            alt="sales@infynno.com"
            target="_blank"
          >
            sales@infynno.com
          </a>
          . If you&apos;d rather not receive this kind of email, you can{' '}
          <a href="#" className="text-[#365CCE] hover:underline">
            unsubscribe
          </a>{' '}
          or{' '}
          <a href="#" className="text-[#365CCE] hover:underline">
            manage your email preferences
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Verification;
