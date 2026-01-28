import { useEffect, useState, type FormEvent } from 'react'
import CookieBanner from '../components/CookieBanner'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import QuizPopup from '../components/QuizPopup'
import ResultPopup from '../components/ResultPopup'
import Slideshow from '../components/Slideshow'
import { MAX_INTERESTS, slides } from '../constants'

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false)
  const [ageRange, setAgeRange] = useState('')
  const [education, setEducation] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [resultData, setResultData] = useState<unknown | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuiz(true)
    }, 60_000)
    return () => clearTimeout(timer)
  }, [])

  const handleInterestToggle = (option: string) => {
    setInterests((prev) => {
      const alreadySelected = prev.includes(option)
      if (alreadySelected) {
        return prev.filter((item) => item !== option)
      }
      if (prev.length >= MAX_INTERESTS) {
        return prev
      }
      return [...prev, option]
    })
  }

  const handleQuizSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      // For now, accept and forward whatever values the form has (no strict typing on payload)
      const payload: Record<string, unknown> = {
        age: ageRange || null,
        education,
        interests,
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      // Log the API response so you can inspect it in the browser console
      console.log('Profile API response:', data)
      console.log(
        'Extracted values - salary:',
        data?.salary,
        'growth_potential:',
        data?.growth_potential,
        'industry_sector:',
        data?.industry_sector,
      )
      setResultData({ payload, recommendation: data })
      setShowResult(true)
    } catch (error) {
      console.error('Error calling profile API:', error)
      setResultData({
        error: 'We could not reach the recommendation service right now. Please try again in a bit.',
      })
      setShowResult(true)
    }

    setHasSubmittedQuiz(true)
    setTimeout(() => {
      setShowQuiz(false)
    }, 800)
  }

  const handleTakeQuizClick = () => {
    setAgeRange('')
    setEducation('')
    setInterests([])
    setHasSubmittedQuiz(false)
    setShowQuiz(true)
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900 flex flex-col">
      <Navbar onTakeQuizClick={handleTakeQuizClick} />

      {/* Main content */}
      <main className="flex-1">
        <Hero />
        <Slideshow currentSlide={currentSlide} onSlideChange={setCurrentSlide} />
      </main>

      <Footer />
      <CookieBanner />

      <QuizPopup
        show={showQuiz}
        onClose={() => setShowQuiz(false)}
        ageRange={ageRange}
        education={education}
        interests={interests}
        hasSubmitted={hasSubmittedQuiz}
        onAgeChange={setAgeRange}
        onEducationChange={setEducation}
        onInterestToggle={handleInterestToggle}
        onSubmit={handleQuizSubmit}
      />

      <ResultPopup show={showResult} onClose={() => setShowResult(false)} resultData={resultData} />
    </div>
  )
}


