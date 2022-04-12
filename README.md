# Section 11 - Changing Pages With Routing

This is one of several repos that I created for the course "Angular - The Complete Guide (2022 Edition)". For a complete list of repos created for this course: https://gist.github.com/christophervigliotti/92e5b3b93cbe9d630d8e9d81b7eb6636 .

## Chapters

```
124. Module Introduction

125. Why do we need a Router?

126. Understanding the Example Project

127. Setting up and Loading Routes

128. Navigating with Router Links

129. Understanding Navigation Paths

130. Styling Active Router Links

131. Navigating Programmatically

132. Using Relative Paths in Programmatic Navigation

133. Passing Parameters to Routes

134. Fetching Route Parameters

135. Fetching Route Parameters Reactively

136. An Important Note about Route Observables

137. Passing Query Parameters and Fragments

138. Retrieving Query Parameters and Fragments

139. Practicing and some Common Gotchas

140. Setting up Child (Nested) Routes

141. Using Query Parameters - Practice

142. Configuring the Handling of Query Parameters

143. Redirecting and Wildcard Routes

144. Important: Redirection Path Matching

145. Outsourcing the Route Configuration

146. An Introduction to Guards

147. Protecting Routes with canActivate

148. Protecting Child (Nested) Routes with canActivateChild

149. Using a Fake Auth Service

150. Controlling Navigation with canDeactivate

151. Passing Static Data to a Route

152. Resolving Dynamic Data with the resolve Guard

153. Understanding Location Strategies

154. Wrap Up
```

# Additional Yammering

## Error When Running `npm -i`

* posted over at https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656272#questions/17278720 
* details at https://gist.github.com/christophervigliotti/7827912e379376fe3fbbe81e190333c0 

### Solution Attempt 

```
# uninstall the things
sudo apt-get remove nodejs
sudo apt-get remove npm
sudo rm /etc/apt/sources.list.d/*

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# close and reopen terminal now or...
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# verify installation
command -v nvm

# next step...
https://dev.to/ms314006/how-to-install-npm-through-nvm-node-version-manager-5gif

```