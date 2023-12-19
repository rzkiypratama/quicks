interface NewMessageLineProps {
  isNewMessage: boolean;
}

const NewMessageLine: React.FC<NewMessageLineProps> = ({ isNewMessage }) => {
  return (
    <div
      className={`relative mt-10 text-center ${
        isNewMessage ? "block" : "hidden"}`}>
      <hr className="mx-auto w-full border-t-2 border-[#EB5757]" />
      <span className="relative top-[-12px] bg-white px-2 text-[#EB5757]">
        New Message
      </span>
    </div>
  );
};

export default NewMessageLine;
