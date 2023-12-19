interface NewMessageLineProps {
  isNewMessage: boolean;
}

const NewMessageLine: React.FC<
  NewMessageLineProps
> = ({ isNewMessage }) => {
  return (
    <div
      className={`relative text-center mt-10 ${
        isNewMessage ? "block" : "hidden"
      }`}
    >
      <hr className='border-t-2 border-[#EB5757] w-full mx-auto' />
      <span className='bg-white px-2 text-[#EB5757] relative top-[-12px]'>
        New Message
      </span>
    </div>
  );
};

export default NewMessageLine;
