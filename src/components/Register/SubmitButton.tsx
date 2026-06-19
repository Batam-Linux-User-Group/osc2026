interface SubmitButtonProps {
    isSubmitting: boolean
  }
  
  export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-[#E55A2B] text-white py-3.5 px-6 rounded-xl font-bold hover:bg-[#d34e20] focus:outline-none focus:ring-2 focus:ring-[#E55A2B] focus:ring-offset-2 focus:ring-offset-[#1C1A1A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Mendaftar...
        </div>
      ) : (
        "Daftar Sekarang"
      )}
    </button>
  )
}
  