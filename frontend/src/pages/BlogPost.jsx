import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";

const BlogPost = () => {
  const { id } = useParams();
  const blogPost = {
    id: 1,
    title: "Understanding Your Dosha: A Complete Guide",
    excerpt:
      "Discover how to identify your unique Ayurvedic constitution and live in harmony with your natural tendencies.",
    author: "Dr. Priya Sharma",
    authorBio: "Senior Ayurveda Practitioner with 15+ years of experience",
    date: "Dec 25, 2024",
    readTime: "8 min read",
    category: "Fundamentals",
    image: "🧘♀️",
    tags: ["Dosha", "Constitution", "Beginner"],
    content: `
      <h2>What is a Dosha?</h2>
      <p>In Ayurveda, doshas are the three fundamental energies that govern all physiological and psychological processes in the body. These three doshas - Vata, Pitta, and Kapha - are derived from the five elements (panchamahabhutas) and represent different combinations of these elements.</p>
      
      <h3>The Three Doshas Explained</h3>
      
      <h4>Vata Dosha (Air + Space)</h4>
      <p>Vata is responsible for all movement in the body, including breathing, circulation, and nerve impulses. People with dominant Vata tend to be:</p>
      <ul>
        <li>Creative and energetic</li>
        <li>Quick thinking but may have difficulty focusing</li>
        <li>Prone to anxiety and restlessness when imbalanced</li>
        <li>Physically light and agile</li>
      </ul>
      
      <h4>Pitta Dosha (Fire + Water)</h4>
      <p>Pitta governs metabolism, digestion, and transformation. Pitta-dominant individuals typically exhibit:</p>
      <ul>
        <li>Strong leadership qualities</li>
        <li>Sharp intellect and good decision-making skills</li>
        <li>Tendency toward irritability when stressed</li>
        <li>Medium build with good muscle tone</li>
      </ul>
      
      <h4>Kapha Dosha (Earth + Water)</h4>
      <p>Kapha provides structure, stability, and lubrication to the body. Those with predominant Kapha are often:</p>
      <ul>
        <li>Calm, patient, and nurturing</li>
        <li>Strong and steady with good endurance</li>
        <li>Prone to lethargy when out of balance</li>
        <li>Heavier build with strong immunity</li>
      </ul>
      
      <h3>Determining Your Constitution</h3>
      <p>Your Ayurvedic constitution (Prakriti) is determined at conception and remains constant throughout your life. However, your current state (Vikriti) can change based on lifestyle, diet, stress, and environmental factors.</p>
      
      <p>To determine your dosha, consider these factors:</p>
      <ul>
        <li>Physical characteristics</li>
        <li>Mental and emotional tendencies</li>
        <li>Digestive patterns</li>
        <li>Sleep patterns</li>
        <li>Response to weather and seasons</li>
      </ul>
      
      <h3>Living in Harmony with Your Dosha</h3>
      <p>Once you understand your constitution, you can make lifestyle choices that support your natural tendencies and prevent imbalances. This includes:</p>
      
      <ul>
        <li><strong>Diet:</strong> Eating foods that balance your dominant dosha</li>
        <li><strong>Exercise:</strong> Choosing activities that suit your constitution</li>
        <li><strong>Daily Routine:</strong> Following a schedule that supports your natural rhythms</li>
        <li><strong>Seasonal Adjustments:</strong> Modifying your lifestyle with changing seasons</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Understanding your dosha is the foundation of Ayurvedic healing and wellness. By recognizing your unique constitution and current imbalances, you can make informed choices about diet, lifestyle, and treatments that will help you achieve optimal health and well-being.</p>
    `,
  };

  const relatedPosts = [
    { id: 2, title: "Seasonal Eating According to Ayurveda", image: "🍲" },
    { id: 3, title: "The Power of Meditation in Ayurveda", image: "🧠" },
    { id: 4, title: "Ayurvedic Herbs for Modern Stress", image: "🌿" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
              {blogPost.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blogPost.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>{blogPost.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="sm" icon={ShareIcon}>
              Share
            </Button>
            <Button variant="ghost" size="sm" icon={BookmarkIcon}>
              Save
            </Button>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          className="h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-8xl mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {blogPost.image}
        </motion.div>

        {/* Article Content */}
        <motion.div
          className="prose prose-lg max-w-none mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
          style={{
            color: "#374151",
            lineHeight: "1.75",
          }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {blogPost.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio */}
        <div className="glassmorphism rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {blogPost.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {blogPost.author}
              </h3>
              <p className="text-gray-600">{blogPost.authorBio}</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <div className="glassmorphism rounded-xl p-4 hover:shadow-lg transition-all group">
                  <div className="text-3xl mb-2 text-center">{post.image}</div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogPost;
