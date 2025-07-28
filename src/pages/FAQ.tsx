import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What makes your products sustainable?",
      answer: "All our products are carefully vetted for environmental impact. We only partner with brands that use sustainable materials, ethical manufacturing processes, and eco-friendly packaging. Each product must meet our strict sustainability criteria including certifications like USDA Organic, FSC Certified, or Fair Trade."
    },
    {
      question: "How do you calculate carbon footprint savings?",
      answer: "We work with environmental consultants to calculate the carbon savings of each product compared to conventional alternatives. This includes factors like sustainable materials, manufacturing processes, transportation, and end-of-life disposal. Our calculations are based on industry-standard methodologies."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, you can return it within 30 days for a full refund. Items must be in original condition. We provide prepaid return labels for your convenience."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 35 countries worldwide. Shipping costs and delivery times vary by location. We use carbon-neutral shipping methods whenever possible and offset the carbon footprint of all international shipments."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also check your order status by logging into your account and visiting the 'Order History' section in your profile."
    },
    {
      question: "Are your products certified organic/fair trade?",
      answer: "Many of our products carry certifications like USDA Organic, Fair Trade, FSC Certified, and others. Each product page clearly lists all relevant certifications. We believe in transparency and only work with verified sustainable brands."
    },
    {
      question: "How do I earn and use rewards points?",
      answer: "You earn 10 points for every dollar spent. Points can be redeemed for discounts on future purchases (100 points = $1). You also earn bonus points for writing reviews, referring friends, and participating in our eco-challenges."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "You can cancel or modify your order within 2 hours of placing it. After that, orders enter processing and cannot be changed. If you need to make changes, please contact our customer service team immediately."
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-tree-100 text-tree-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <HelpCircle className="h-4 w-4" />
              Frequently Asked Questions
            </div>
            <h1 className="text-4xl font-outfit font-bold text-forest-700 mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, and sustainability practices.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-forest-700 hover:text-tree-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sage-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-xl font-outfit font-semibold text-forest-700 mb-4">
              Still have questions?
            </h3>
            <p className="text-sage-600 mb-6">
              Our customer service team is here to help you with any other questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@greenwise.eco" className="bg-tree-600 hover:bg-tree-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Email Support
              </a>
              <a href="tel:+15551234567" className="bg-white border border-tree-300 hover:bg-tree-50 text-tree-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;