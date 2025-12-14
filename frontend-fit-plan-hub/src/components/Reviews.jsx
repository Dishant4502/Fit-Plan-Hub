

export default function Review() {
  const reviews = [
    {
      id: 1,
      userName: "Sarah Johnson",
      rating: 5,
      trainerName: "Mike Thompson",
      title: "Amazing Transformation Journey",
      description:
        "Mike's training program completely changed my life. His personalized approach and constant motivation helped me lose 30 pounds in 4 months. Highly recommend!",
    },
    {
      id: 2,
      userName: "David Martinez",
      rating: 5,
      trainerName: "Emily Chen",
      title: "Best Decision Ever",
      description:
        "Emily is incredibly knowledgeable and patient. She helped me build muscle and improve my overall fitness. The workouts are challenging but rewarding.",
    },
    {
      id: 3,
      userName: "Jessica Lee",
      rating: 4,
      trainerName: "Alex Rivera",
      title: "Great Results",
      description:
        "Alex's yoga and strength training combination worked wonders for my flexibility and core strength. I feel more energized throughout the day.",
    },
    {
      id: 4,
      userName: "Michael Brown",
      rating: 5,
      trainerName: "Sarah Williams",
      title: "Exceeded Expectations",
      description:
        "Sarah's cardio and HIIT programs are intense but effective. Lost 20 pounds and gained so much confidence. Her nutritional advice was also incredibly helpful.",
    },
    {
      id: 5,
      userName: "Amanda Davis",
      rating: 5,
      trainerName: "James Anderson",
      title: "Life Changing Experience",
      description:
        "James helped me prepare for my first marathon. His training plan was perfectly structured and his support kept me motivated through the tough days.",
    },
    {
      id: 6,
      userName: "Robert Wilson",
      rating: 4,
      trainerName: "Lisa Martinez",
      title: "Excellent Training",
      description:
        "Lisa's CrossFit approach pushed me beyond my limits. I've gained strength I never thought possible and made great friends in the process.",
    },
    {
      id: 7,
      userName: "Emily Taylor",
      rating: 5,
      trainerName: "Mike Thompson",
      title: "Highly Professional",
      description:
        "Mike's attention to form and technique prevented injuries while maximizing results. His workout plans are well-structured and progressive.",
    },
    {
      id: 8,
      userName: "Chris Anderson",
      rating: 5,
      trainerName: "Emily Chen",
      title: "Outstanding Support",
      description:
        "Emily provides constant encouragement and adjusts workouts based on my progress. She truly cares about her clients' success and well-being.",
    },
    {
      id: 9,
      userName: "Rachel Green",
      rating: 4,
      trainerName: "Alex Rivera",
      title: "Fantastic Experience",
      description:
        "Alex's pilates sessions improved my posture and reduced my back pain significantly. The personalized attention makes all the difference.",
    },
  ]

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`text-xl Rs{index < rating ? "text-yellow-400" : "text-gray-600"}`}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Client Reviews</h1>
          <p className="text-gray-400 text-lg">See what our clients have to say about their transformation journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">{review.userName}</h3>
                {renderStars(review.rating)}
              </div>

              <p className="text-purple-400 text-sm mb-3">Trainer: {review.trainerName}</p>

              <h4 className="text-lg font-medium mb-2">{review.title}</h4>

              <p className="text-gray-400 leading-relaxed">{review.description}</p>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  )
}
