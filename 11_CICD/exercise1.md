# Continuos Integration

## CI Overview
One of the fundamental steps in developing an application is Continuos Integrations. It is essential to fix bugs and improve the code with new functionalities. This is a better approach as trying to create a perfect application that will never change.

It becomes a software necessity as well when the application is developed and maintained by a group of developers. It can be benefitial to set coding standards for the project, such as a pattern in naming files, structure and so on. One of the tools that this course covered was linting, which is essentially creating patters for developers to follow. This is also one part of CI.

When making changes to a project it is quite often to introduce bugs or break functionalities that were working in the past, therefore it is a necessity to have tests, which were also covered in this course. Tests can be a part of CI as a way to ensure the new changes don't revert existing functionalities.

As for building, which is the part where the software takes form into, hopefully, a user friendly application, is also a part of CI. The part of building is that whenever we want to "publish" new code, the build process have to run again and once we set a good CI process, deploying an application becomes way easier.

## Alternatives to set up the CI besides Jenkins and GitHub Actions? 
By a quick google search there are many substitues for Jenkins and GitHub Actions that can set up the CI. Those alternatives are: Circle CI, GitLab, TeamCity, Travis CI, and I can keep naming.  

## Considering a PHP project where is maintained by a team of 6 people is it better to self-host or set a cloud-based environment?
It depends, my short answer would be to set a cloud-based environment. Because there are few people on the project and a self-host can require lots of time to set up and to maintain, where as a cloud hosted CI would be maintained for the team. However, if I think a bit more, it would depend on the capability and financial resources of the project. If there is someone who is really good at one way rather than the other, I would take that into account. The same goes for pricing, I believe cloud computing can be quite cheap when we are talking about an application that the demand has its picks, so for example, applications that do not have to be available at any time or even apps that are used only in a certain time of the day. Those conditions can help cloud developing be more cheap since you can normally have a good discount when those conditions are made. 