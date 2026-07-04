import React from 'react'

const OnboardingPage = () => {
  const { data: authData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await API.get("/auth/me");
      return res.data
    },
    retry: false,
  });
  return (
    <div>OnboardingPage</div>
  )
}

export default OnboardingPage