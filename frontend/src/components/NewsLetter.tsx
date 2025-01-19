import React, { FormEvent } from 'react';

const NewsLetter: React.FC = () => {
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="py-12 px-6 sm:px-10 text-center rounded-lg">
      <p className="text-3xl font-semibold text-black">
        Subscribe now & get <span className="underline">20% off</span>
      </p>
      <p className="text-gray-600 mt-4">
        Stay updated with our latest news and exclusive offers.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto"
      >
        <input
          required
          className="w-full sm:flex-1 p-4 rounded-lg border border-gray-400 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-800"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-4 rounded-lg shadow-md text-sm font-semibold hover:bg-gray-800 transition-colors duration-300"
        >
          SUBSCRIBE
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        * We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsLetter;