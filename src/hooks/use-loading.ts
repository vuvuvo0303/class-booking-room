import { useState } from 'react'

const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
  return {isLoading, setIsLoading, isSubmitting, setIsSubmitting}
}

export default useLoading;