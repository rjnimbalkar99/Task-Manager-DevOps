
                            sed -i 's/tag: .*/tag: "${BUILD_ID}"/' values.yaml           # Updates the image tag in values.yaml to the new build ID.
                            echo "${BUILD_ID}"                                            # Outputs the current build ID for logging purposes.
                            git config --global user.name ${GITHUB_USERNAME}
                            git config --global user.email "rjnimbalkar99@gmail.com"
                            git clean -fdx                                                # Removes all untracked files and directories from the working directory.
                            git add -A                                                    # Stages all changes for commit.
                            git commit -m "Update tag in Helm chart"
                            git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_PAT}@github.com/rjnimbalkar99/Task-Manager-DevOps
                            git push origin main                                          # Pushes the committed changes back to the main branch of the repository.
                        