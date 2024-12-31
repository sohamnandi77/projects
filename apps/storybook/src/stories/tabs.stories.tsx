import type { Meta, StoryObj } from "@storybook/react";
import { Apple, Clock, Scissors } from "lucide-react";

import { Collection } from "@projects/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@projects/ui/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: {
    Tab: TabsTrigger,
    TabsList,
    TabsPanel: TabsContent,
  },
  tags: ["autodocs", "navigation"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <Tabs aria-label="Recipe App">
        <TabsList>
          <TabsTrigger id="recipes">Recipes</TabsTrigger>
          <TabsTrigger id="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger id="meal-plans">Meal Plans</TabsTrigger>
          <TabsTrigger id="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent id="recipes">
          Browse through a wide selection of recipes for all occasions.
        </TabsContent>
        <TabsContent id="ingredients">
          Check the list of ingredients needed for your chosen recipes.
        </TabsContent>
        <TabsContent id="meal-plans">
          Discover curated meal plans to simplify your weekly cooking.
        </TabsContent>
        <TabsContent id="videos">
          Watch cooking videos to learn new techniques and recipes.
        </TabsContent>
      </Tabs>
    );
  },
};

export const WithIcons: Story = {
  render: function Render() {
    return (
      <Tabs aria-label="Fitness App">
        <TabsList>
          <TabsTrigger className="space-x-2" id="workouts">
            <Scissors className="size-4" /> <span>Workouts</span>
          </TabsTrigger>
          <TabsTrigger className="space-x-2" id="nutrition">
            <Apple className="size-4" /> <span>Nutrition</span>
          </TabsTrigger>
          <TabsTrigger className="space-x-2" id="tracker">
            <Clock className="size-4" /> <span>Tracker</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent id="workouts">
          Find a variety of workout plans tailored to your fitness level and
          goals.
        </TabsContent>
        <TabsContent id="nutrition">
          Get nutrition tips and meal plans to complement your fitness journey.
        </TabsContent>
        <TabsContent id="tracker">
          Track your progress with detailed statistics and analytics.
        </TabsContent>
      </Tabs>
    );
  },
};

export const Orientation: Story = {
  render: function Render() {
    return (
      <Tabs orientation="vertical" aria-label="E-Learning Platform">
        <TabsList>
          <TabsTrigger id="courses">Courses</TabsTrigger>
          <TabsTrigger id="exams">Exams</TabsTrigger>
          <TabsTrigger id="grades">Grades</TabsTrigger>
          <TabsTrigger id="forums">Forums</TabsTrigger>
          <TabsTrigger id="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent id="courses">
          Enroll in courses and access learning materials on various subjects.
        </TabsContent>
        <TabsContent id="exams">
          Take practice exams and quizzes to test your knowledge.
        </TabsContent>
        <TabsContent id="grades">
          View your grades and track your academic progress.
        </TabsContent>
        <TabsContent id="forums">
          Participate in discussion forums with other students and instructors.
        </TabsContent>
        <TabsContent id="profile">
          Update your profile and customize your learning preferences.
        </TabsContent>
      </Tabs>
    );
  },
};

export const Collections: Story = {
  render: function Render() {
    const tabs = [
      {
        id: 1,
        title: "Overview",
        content: "This is the overview tab content.",
      },
      {
        id: 2,
        title: "Features",
        content: "Details about the features are listed here.",
      },
      {
        id: 3,
        title: "Pricing",
        content: "Find the pricing information on this tab.",
      },
      {
        id: 4,
        title: "Reviews",
        content: "Read user reviews and ratings here.",
      },
    ];
    return (
      <Tabs aria-label="Project Management">
        <TabsList aria-label="Dynamic tabs" items={tabs}>
          {(item) => <TabsTrigger>{item.title}</TabsTrigger>}
        </TabsList>
        <Collection items={tabs}>
          {(item) => <TabsContent key={item.id}>{item.content}</TabsContent>}
        </Collection>
      </Tabs>
    );
  },
};

export const Links: Story = {
  render: function Render() {
    const navs = [
      { url: "#", label: "Home" },
      { url: "#themes", label: "Themes" },
      { url: "#colors", label: "Colors" },
    ];

    return (
      <Tabs aria-label="Navbar">
        <TabsList items={navs}>
          {(item) => (
            <TabsTrigger id={item.label} href={item.url}>
              {item.label}
            </TabsTrigger>
          )}
        </TabsList>
      </Tabs>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    return (
      <Tabs disabledKeys={["contact", "about-us"]} aria-label="Services">
        <TabsList>
          <TabsTrigger id="overview"> Overview</TabsTrigger>
          <TabsTrigger id="contact"> Contact</TabsTrigger>
          <TabsTrigger id="about-us"> About Us</TabsTrigger>
        </TabsList>
        <TabsContent id="overview">
          Welcome to our service! Here, you’ll find a brief overview of what we
          offer, our mission, and how we strive to provide value to our
          customers.
        </TabsContent>
        <TabsContent id="contact">
          Get in touch with us through our contact page. We are here to help you
          with any inquiries, support requests, or feedback you may have.
        </TabsContent>
        <TabsContent id="about-us">
          Learn more about our company, our history, and the team behind our
          success. We are dedicated to delivering the best service to our
          customers.
        </TabsContent>
      </Tabs>
    );
  },
};
