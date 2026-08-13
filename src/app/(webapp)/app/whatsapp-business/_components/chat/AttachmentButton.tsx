export const metadata = {
  title: "WhatsApp Business",
  description: "Manage your WhatsApp Business conversations and contacts.",
};

export const AttachmentButton = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-full p-2 text-vaTextPrimary hover:bg-accent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
        />
      </svg>
    </button>
  );
}