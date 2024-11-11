# # db/seeds.rb

# require 'open-uri'

# Project.destroy_all

# project_data = [
#   {
#     name: "Weather App",
#     description: "A web application that provides weather forecasts.",
#     image_files: ["weather-app.png"],
#     live_link: "https://weather-app.example.com",
#   },
#   {
#     name: "Todo List",
#     description: "An app to manage your daily tasks.",
#     image_files: ["todo-list.png"],
#     live_link: "https://todo-list.example.com",
#   },
#   {
#     name: "Chat Application",
#     description: "A real-time chat application using WebSockets.",
#     image_files: ["chat-app.png"],
#     live_link: "https://chat-app.example.com",
#   },
#   {
#     name: "E-commerce Platform",
#     description: "An online marketplace for buying and selling products.",
#     image_files: ["e-commerce.png"],
#     live_link: "https://e-commerce.example.com",
#   },
#   {
#     name: "Portfolio Website",
#     description: "A personal portfolio to showcase projects and skills.",
#     image_files: ["portfolio.png"],
#     live_link: "https://portfolio.example.com",
#   },
#   {
#     name: "Blog Platform",
#     description: "A platform for creating and sharing blog posts.",
#     image_files: ["blog-platform.png"],
#     live_link: "https://blog-platform.example.com",
#   },
# ]

# project_data.each do |data|
#   project = Project.create!(
#     name: data[:name],
#     description: data[:description],
#     live_link: data[:live_link]
#   )

#   data[:image_files].each do |filename|
#     file_path = Rails.root.join('db', 'seeds', 'images', filename)
#     if File.exist?(file_path)
#       project.images.attach(
#         io: File.open(file_path),
#         filename: filename,
#         content_type: 'image/png' # Adjust the content type as needed
#       )
#     else
#       puts "File not found: #{file_path}"
#     end
#   end
# end

# puts "Seeded #{Project.count} projects."
