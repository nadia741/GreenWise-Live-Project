
import React from 'react';
import { Leaf, Users, Award, Target, Heart, Globe, Shield, Recycle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Green",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&auto=format",
      bio: "Environmental scientist turned entrepreneur with 15+ years of sustainability experience. Passionate about making eco-living accessible to everyone.",
      linkedin: "#"
    },
    {
      name: "Mike Chen",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
      bio: "Tech innovator focused on building scalable platforms for environmental impact. Former software engineer at leading green tech companies.",
      linkedin: "#"
    },
    {
      name: "Emily Davis",
      role: "Head of Sustainability",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format",
      bio: "Sustainability expert ensuring all our products meet the highest eco standards. PhD in Environmental Science from Stanford University.",
      linkedin: "#"
    },
    {
      name: "Alex Rivera",
      role: "Product Development Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
      bio: "Product strategist with a passion for circular economy. Leads our vendor partnerships and product curation process.",
      linkedin: "#"
    }
  ];

  const achievements = [
    { icon: Users, number: "50,000+", label: "Happy Customers", description: "Satisfied eco-conscious shoppers" },
    { icon: Leaf, number: "2.5M kg", label: "CO₂ Saved", description: "Carbon emissions prevented" },
    { icon: Award, number: "25+", label: "Sustainability Awards", description: "Industry recognition" },
    { icon: Globe, number: "35", label: "Countries Served", description: "Global sustainable impact" }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "Every decision we make is evaluated through the lens of environmental impact. We prioritize products that genuinely contribute to a healthier planet.",
      color: "from-tree-500 to-forest-500"
    },
    {
      icon: Heart,
      title: "Transparency & Trust",
      description: "We believe in complete transparency about our products' origins, certifications, and environmental impact. No greenwashing, just honest information.",
      color: "from-sage-500 to-tree-500"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Building a global community of conscious consumers making positive changes together. Your choices inspire others to live more sustainably.",
      color: "from-forest-500 to-sage-600"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous testing and verification. We ensure that sustainable choices never mean compromising on quality or performance.",
      color: "from-tree-600 to-forest-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50/30 to-cream-50">
      <Header />
      
      <div className="pt-20">
        {/* Enhanced Hero Section */}
        <section className="py-20 bg-gradient-to-br from-tree-600 via-forest-600 to-sage-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Globe className="h-4 w-4" />
                About GreenWise Marketplace
              </div>
              <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-8">
                Pioneering Sustainable
                <span className="block text-tree-200">Commerce</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-tree-100">
                We're not just another e-commerce platform. We're a movement towards conscious consumption, 
                connecting ethical brands with environmentally aware consumers to create lasting positive change.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-sage-50/30 to-transparent"></div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-8">Our Mission</h2>
                <p className="text-lg text-sage-600 mb-6 leading-relaxed">
                  At GreenWise, we believe that every purchase is a vote for the kind of world we want to live in. 
                  Our mission is to make sustainable living accessible, affordable, and rewarding for everyone by 
                  curating the world's best eco-friendly products.
                </p>
                <p className="text-lg text-sage-600 mb-8 leading-relaxed">
                  We rigorously vet every product in our catalog to ensure it meets our high standards for 
                  sustainability, quality, and ethical production. From carbon-neutral shipping to plastic-free 
                  packaging, we're committed to minimizing our environmental footprint at every step.
                </p>
                <Button className="bg-tree-600 hover:bg-tree-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg">
                  Learn Our Process
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-tree-500 to-forest-600 rounded-3xl p-12 text-white shadow-2xl">
                  <Target className="h-16 w-16 mb-6 text-tree-200" />
                  <h3 className="text-2xl font-outfit font-bold mb-4">Our 2025 Goal</h3>
                  <p className="text-tree-100 text-lg leading-relaxed mb-6">
                    To save 10 million kg of CO₂ and help 1 million people transition to sustainable lifestyles through conscious commerce.
                  </p>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-tree-200">10M kg</div>
                      <div className="text-tree-100 text-sm">CO₂ Target</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-tree-200">1M</div>
                      <div className="text-tree-100 text-sm">People Helped</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-sage-50/50 to-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-6">Our Core Values</h2>
              <p className="text-xl text-sage-600 max-w-3xl mx-auto">
                These principles guide every decision we make and every partnership we form
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative animate-fade-in-scale"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-tree-100">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl mb-6 shadow-lg`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-outfit font-bold text-forest-700 mb-4">{value.title}</h3>
                    <p className="text-sage-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white/80">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-6">Meet Our Team</h2>
              <p className="text-xl text-sage-600 max-w-3xl mx-auto">
                Passionate individuals dedicated to creating a more sustainable future through conscious commerce
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="group text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-48 h-48 rounded-2xl mx-auto object-cover shadow-lg group-hover:shadow-2xl transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-outfit font-bold text-forest-700 mb-2">{member.name}</h3>
                  <p className="text-tree-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-sage-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-gradient-to-br from-forest-600 to-tree-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-outfit font-bold mb-6">Our Impact So Far</h2>
              <p className="text-xl text-tree-100 max-w-3xl mx-auto">
                Together with our community, we're making measurable progress toward a sustainable future
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="text-center animate-fade-in-scale"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-lg">
                    <achievement.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-outfit font-bold mb-2">{achievement.number}</div>
                  <div className="text-lg font-semibold mb-2">{achievement.label}</div>
                  <div className="text-tree-100 text-sm">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-b from-sage-50/50 to-cream-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-6">Get In Touch</h2>
              <p className="text-xl text-sage-600 max-w-3xl mx-auto">
                Have questions about our mission, products, or partnerships? We'd love to hear from you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-tree-100 rounded-2xl mb-6">
                  <Globe className="h-8 w-8 text-tree-600" />
                </div>
                <h3 className="text-xl font-outfit font-bold text-forest-700 mb-4">Visit Our HQ</h3>
                <p className="text-sage-600 leading-relaxed">
                  123 Sustainable Way<br />
                  Portland, OR 97201<br />
                  United States
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-tree-100 rounded-2xl mb-6">
                  <Users className="h-8 w-8 text-tree-600" />
                </div>
                <h3 className="text-xl font-outfit font-bold text-forest-700 mb-4">Contact Us</h3>
                <p className="text-sage-600 leading-relaxed">
                  hello@greenwise.com<br />
                  partnerships@greenwise.com<br />
                  (555) 123-GROW
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-tree-100 rounded-2xl mb-6">
                  <Heart className="h-8 w-8 text-tree-600" />
                </div>
                <h3 className="text-xl font-outfit font-bold text-forest-700 mb-4">Business Hours</h3>
                <p className="text-sage-600 leading-relaxed">
                  Monday - Friday: 9AM - 6PM PST<br />
                  Saturday: 10AM - 4PM PST<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
